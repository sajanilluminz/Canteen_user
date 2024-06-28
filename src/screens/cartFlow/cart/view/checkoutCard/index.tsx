import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {DUMY_IMG} from '~assets';
import Price from '~components/price/price';
import {
  colors,
  fontFamily,
  fontsSizes,
  windowWidth,
} from '~utils/styles.common';
import {Path, Svg} from 'react-native-svg';
import {touchSlope} from '~utils/appUtils';
import {IPlaceOrderObj} from '~state/slices/commonTypes';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {
  addProductToCart,
  removeProductFromCart,
} from '~state/slices/cart/cartSlice';
import {useToast} from 'react-native-toast-notifications';
import {
  decreaseProductQuantityOnCardUpdate,
  updateProductQuantityOnCartUpdate,
} from '~state/slices/allproducts/allProductsSlice';

type ICheckoutCardProps = {
  item: IPlaceOrderObj;
};

const CheckoutCard: React.FC<ICheckoutCardProps> = ({item}) => {
  const toast = useToast();

  const dispatch = useDispatch();

  const quantityUpdater = () => {
    if (item.quantity < 5) {
      dispatch(addProductToCart(item));
      dispatch(updateProductQuantityOnCartUpdate(item));
    } else {
      toast.show('You can order a maximum quantity of 5', {
        type: 'green',
      });
      toast.hideAll();
    }
  };

  const quantityReducer = () => {
    dispatch(removeProductFromCart(item));
    dispatch(decreaseProductQuantityOnCardUpdate(item));
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <FastImage
          source={
            item?.image
              ? {
                  uri: item?.image,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }
              : DUMY_IMG
          }
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.description}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.productName}>
            {item?.name}
          </Text>
          <View style={styles.bottomContainer}>
            <View>
              <Text style={styles.categoryName}>{item?.category}</Text>
              <Price amount={item.price} fontSize={fontsSizes.twenty} />
            </View>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                onPress={quantityReducer}
                style={styles.minus}
                hitSlop={touchSlope}>
                <Svg width="9" height="4" viewBox="0 0 9 4" fill="none">
                  <Path
                    d="M0.671326 0.941345H8.2937V3.05861H0.671326V0.941345Z"
                    fill="white"
                  />
                </Svg>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={quantityUpdater}
                style={styles.plus}
                hitSlop={touchSlope}>
                <Svg width="11" height="10" viewBox="0 0 11 10" fill="none">
                  <Path d="M0 3.94137H11V6.05863H0V3.94137Z" fill="white" />
                  <Path
                    d="M6.66448 9.25485e-08L6.66448 10H4.33549L4.33549 0L6.66448 9.25485e-08Z"
                    fill="white"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(CheckoutCard);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 72,
    height: 82,
    resizeMode: 'contain',
  },
  description: {
    marginLeft: 12,
    flex: 1,
    marginTop: 5,
  },
  categoryName: {
    color: '#5E5C66',
    fontSize: fontsSizes.eleven,
    fontFamily: fontFamily.prompt400,
  },
  productName: {
    color: colors.darkGreen,
    maxWidth: (windowWidth * 80) / 100,
    fontSize: fontsSizes.fourteen,
    fontFamily: fontFamily.prompt500,
  },
  quantity: {
    color: colors.white,
    fontSize: fontsSizes.fourteen,
    fontFamily: fontFamily.prompt600,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    alignItems: 'center',
    width: 109,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.blue,
  },
  minus: {
    paddingRight: 5,
  },
  plus: {
    paddingLeft: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});
