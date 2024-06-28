/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {scaledValue, fontFamily, colors} from '~utils/styles.common';
import {IcardProps} from './card.types';
import FastImage from 'react-native-fast-image';
import {DUMY_IMG} from '~assets';
import CardCounter from '~screens/views/cardCounter';
import {useDispatch} from 'react-redux';
import {
  addProductToCart,
  removeProductFromCart,
} from '~state/slices/cart/cartSlice';
import {useToast} from 'react-native-toast-notifications';

const ProductCard: React.FC<IcardProps> = props => {
  console.log('====================================');
  console.log('quantity: ' + props.item.quantity);
  console.log('====================================');
  const toast = useToast();
  const dispatch = useDispatch();
  let maxQuantity = useMemo(() => 5, []);
  const [productCount, increaseProductCount] = useState(props.item.quantity);

  useEffect(() => {
    increaseProductCount(props.item.quantity);
  }, [props.item.quantity]);

  const updateProductQuantityOnCartUpdate = () => {
    if (productCount < maxQuantity) {
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
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.cardImage}
          resizeMode={FastImage.resizeMode.contain}
          defaultSource={DUMY_IMG}
          source={{
            uri: props.item.image ?? undefined,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
        />
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.categoryName}>{props.item.category}</Text>
        <Text numberOfLines={1} style={styles.productName}>
          {props.item.name}
        </Text>
        <View style={styles.priceView}>
          <Text style={styles.rupeeIcon}>₹</Text>
          <Text style={styles.rupeeValue}>{props.item.price}</Text>
        </View>
      </View>
      {props.item.isActive ? (
        <CardCounter
          count={productCount}
          updateCount={updateProductQuantityOnCartUpdate}
          decreaseCount={decrementProductQuantityOnCartUpdate}
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

export default memo(ProductCard);

const styles = StyleSheet.create({
  card: {
    width: scaledValue(143),
    height: scaledValue(170),
    backgroundColor: '#FBF6F2',
    borderRadius: 16,
    position: 'relative',
    top: 0,
    left: 0,
  },
  cardImage: {
    width: scaledValue(118),
    alignSelf: 'center',
    position: 'absolute',
    top: -40,
    height: scaledValue(95),
  },
  imageContainer: {
    marginBottom: scaledValue(40),
  },
  cardDetails: {
    flex: 1,
    marginRight: scaledValue(15),
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
    fontSize: scaledValue(14),
  },
  priceView: {
    flexDirection: 'row',
  },
  rupeeIcon: {
    color: '#0B1F28',
    fontFamily: fontFamily.prompt600,
    fontSize: scaledValue(10),
  },
  rupeeValue: {
    color: '#0B1F28',
    fontFamily: fontFamily.prompt700,
    fontSize: scaledValue(20),
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
    backgroundColor: '#0B1F28',
    height: scaledValue(36),
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHeadingNotAvailable: {
    fontSize: scaledValue(14),
    fontFamily: fontFamily.prompt600,
    color: colors.white,
  },
  buttonHeading: {
    fontSize: scaledValue(14),
    fontFamily: fontFamily.prompt600,
    color: '#fff',
  },
});
