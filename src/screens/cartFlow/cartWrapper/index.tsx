/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearCart,
  getCartItemsFromState,
  getCartTotalFromState,
} from '~state/slices/cart/cartSlice';
import {resetProducts} from '~state/slices/allproducts/allProductsSlice';
import AnimatedLoader from '~components/animatedLoader';
import {
  getUserDetails,
  userbalanceAddition,
} from '~state/slices/signup/signupSlice';
import {postApiCall} from '~state/slices/apiManager';
import {placeOrderUrl} from '~constants/baseurl';
import {useToast} from 'react-native-toast-notifications';
import {updateOrderHistoryFromCart} from '~state/slices/orderHistory/orderHistorySlice';
import {useNavigation} from '@react-navigation/native';
import {RoutesName} from '~constants/routes';
import {IRecentObj, IproductObj} from '~state/slices/commonTypes';
import {updateRecentOrdersData} from '~state/slices/recentitems/recentSlice';
import Cart from '../cart';

type aipArgument = {
  quantity: number;
  itemId: string;
  price: number;
};

type ICartWrapperProps = {
  children?: React.ReactNode;
  bottom?: number;
};
const CartWrapper: React.FC<ICartWrapperProps> = ({children, bottom = 0}) => {
  const CartData = useSelector(getCartItemsFromState);
  const details = useSelector(getUserDetails);
  const cartTotal = useSelector(getCartTotalFromState);
  const toast = useToast();
  const [loader, showLoader] = useState<boolean>(false);
  const cartDataLength = CartData.length;

  const dispatch = useDispatch();

  const navigation = useNavigation<any>();

  const placeOrder = async () => {
    showLoader(true);
    let cartProductDetails: aipArgument[] = [];
    CartData.forEach((product: IproductObj) => {
      if (product.quantity && product.itemId && product.price) {
        cartProductDetails.push({
          quantity: product.quantity,
          itemId: product.itemId,
          price: product.price,
        });
      }
    });

    let apiArgs = {
      items: cartProductDetails,
    };
    console.log(apiArgs, 'cartProductDetails');
    let headers = {Authorization: `Bearer ${details.token}`};
    if (cartProductDetails.length > 0) {
      return await postApiCall({url: placeOrderUrl, data: apiArgs, headers})
        .then((response: {data: any; status: number}) => {
          showLoader(false);
          if (response.status === 200) {
            let dataArray: IRecentObj[] = [];
            CartData.forEach((pro: IRecentObj) => {
              let proObj: IRecentObj = {
                orderId: response.data.data._id,
                createdAt: response.data.data.createdAt,
                name: pro.name,
                category: pro.category,
                price: pro.price,
                quantity: pro.quantity,
                itemId: pro.itemId,
                image: pro.image,
                isActive: pro.isActive,
                isDeleted: pro.isDeleted,
              };
              dataArray.push(proObj);
            });
            dispatch(updateRecentOrdersData(dataArray));
            dispatch(updateOrderHistoryFromCart(dataArray));
            dispatch(clearCart());

            dispatch(userbalanceAddition(cartTotal));
            navigation.push(RoutesName.CONFIRMATION, {
              nextRouteName: RoutesName.HOME,
            });
          } else {
            toast.show(`${response?.data?.message}`, {type: 'error'});
          }
        })

        .catch(error => {
          showLoader(false);
          if (error?.response) {
            toast.show(`${error?.response?.data?.message}`, {type: 'error'});
          } else {
            toast.show(`${error.message}`, {type: 'error'});
          }
          toast.hideAll();
          console.log(error.response, 'ERROR');
        });
    }
  };

  const removeCart = useCallback(() => {
    dispatch(clearCart());
    dispatch(resetProducts());
  }, []);

  return (
    <View style={styles.container}>
      {children}
      <View>
        {cartDataLength > 0 && (
          <View
            style={[
              styles.cart,
              {
                bottom: bottom,
              },
            ]}>
            <Cart
              removeCartButton={removeCart}
              cartData={CartData}
              cartTotal={cartTotal}
              placeOrderHandler={placeOrder}
            />
          </View>
        )}
        {loader && <AnimatedLoader />}
      </View>
    </View>
  );
};

export default CartWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    width: '100%',
    height: 500,
  },
  cart: {
    width: '100%',
    position: 'absolute',
  },
});
