import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {scaledValue, fontFamily, colors} from '~utils/styles.common';
import Price from '~components/price/price';
import FastImage from 'react-native-fast-image';
import {DUMY_IMG} from '~assets';
import {IPlaceOrderObj} from '~state/slices/commonTypes';
import CardCounter from '~screens/views/cardCounter';
import {useDispatch} from 'react-redux';
import {
  addProductToCart,
  removeProductFromCart,
} from '~state/slices/cart/cartSlice';
import {useToast} from 'react-native-toast-notifications';

type ISearchCardProps = {
  item: IPlaceOrderObj;
  backgroundColor: string;
  quantity: number;
};

const SearchCard: React.FC<ISearchCardProps> = props => {
  const [productCount, increaseProductCount] = useState(props.item.quantity);

  useEffect(() => {
    increaseProductCount(props.item.quantity);
  }, [props.item.quantity]);

  const toast = useToast();
  const dispatch = useDispatch<any>();
  let maxQuantity = useMemo(() => 5, []);

  const updateProductQuantityOnCartUpdate = () => {
    if (productCount < maxQuantity) {
      Keyboard.dismiss();
      let productWithQuantity = {...props.item, quantity: 1};
      increaseProductCount(productCount + 1);
      dispatch(addProductToCart(productWithQuantity));
    } else {
      toast.show('You can order a maximum quantity of 5', {
        type: 'green',
      });
      toast.hideAll();
    }
  };

  const decrementProductQuantityOnCartUpdate = () => {
    if (productCount && productCount > 0) {
      increaseProductCount(productCount - 1);
      dispatch(removeProductFromCart(props.item));
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: props.backgroundColor,
        },
      ]}>
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.cardImage}
          resizeMode={FastImage.resizeMode.contain}
          defaultSource={DUMY_IMG}
          source={{
            uri: props.item.image ?? undefined,
          }}
        />
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.categoryName}>{props.item.category}</Text>
        <Text numberOfLines={1} style={styles.productName}>
          {props.item.name}
        </Text>
        <Price amount={props.item.price ?? 0} fontSize={14} />
      </View>
      {props.item.isActive ? (
        <CardCounter
          count={productCount ?? 0}
          updateCount={updateProductQuantityOnCartUpdate}
          decreaseCount={decrementProductQuantityOnCartUpdate}
          type="small"
          productDetails={props.item}
        />
      ) : (
        <View style={styles.cardButtonViewNotActive}>
          <Text style={styles.buttonHeadingNotAvailable}>Out of stock</Text>
        </View>
      )}
    </View>
  );
};

export default memo(SearchCard);

const styles = StyleSheet.create({
  card: {
    width: scaledValue(113),
    height: scaledValue(144),
    backgroundColor: '#FBF6F2',
    borderRadius: 16,
    position: 'relative',
    top: 0,
    left: 0,
  },
  cardImage: {
    width: scaledValue(92),
    alignSelf: 'center',
    position: 'absolute',
    top: -35,
    height: scaledValue(74),
    resizeMode: 'contain',
  },
  imageContainer: {
    marginBottom: scaledValue(20),
  },
  cardDetails: {
    flex: 1,
    marginVertical: scaledValue(25),
    paddingLeft: 14,
  },
  categoryName: {
    fontFamily: fontFamily.prompt400,
    color: '#5E5C66',
    fontSize: scaledValue(10),
  },
  productName: {
    fontFamily: fontFamily.prompt500,
    color: '#042F1F',
    fontSize: scaledValue(12),
  },
  cardButtonView: {
    backgroundColor: '#0B1F28',
    height: scaledValue(36),
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardButtonViewNotActive: {
    backgroundColor: colors.cardGrey,
    height: scaledValue(36),
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHeadingNotAvailable: {
    fontSize: scaledValue(14),
    fontFamily: fontFamily.prompt600,
    color: colors.blue,
  },
  buttonHeading: {
    fontSize: scaledValue(12),
    fontFamily: fontFamily.prompt600,
    color: '#fff',
  },
});
