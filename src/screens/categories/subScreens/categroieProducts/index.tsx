import {Image, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HeaderWithBack from '~components/headerWithBack/headerWithBack';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProducts,
  getPrdouctsError as getProductsError,
  getProductsLoadingState,
} from '~state/slices/allproducts/allProductsSlice';
import NetworkError from '~components/error/errorScreen';
import {useAppSelector} from '~state/store';
import {getUserDetails} from '~state/slices/signup/signupSlice';
import ProductCard from '~components/Card/ProductCard';
import {IPlaceOrderObj, IproductObj} from '~state/slices/commonTypes';
import {styles} from './styles';
import {winHeight} from '~utils/styles.common';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';
import {ICategoriesDataProperties} from '~state/slices/getCategroies/categoresData';
import CartWrapper from '~screens/cartFlow/cartWrapper';
import {getCartItemsFromState} from '~state/slices/cart/cartSlice';

type ICategoryProductsProps = {
  route: {
    params: {
      item: ICategoriesDataProperties;
    };
  };
};

const CategoryProducts = ({route}: ICategoryProductsProps) => {
  let params = route.params;
  const error = useAppSelector(getProductsError);
  const productsData = useAppSelector(state => state.products.products);
  const currentCartItems = useSelector(getCartItemsFromState);
  const [products, setProducts] = useState(productsData);
  const loadingState = useAppSelector(getProductsLoadingState);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const details = useAppSelector(getUserDetails);
  const top = useSafeAreaInsets().top + 20;
  const [refreshing, setRefreshing] = React.useState(false);
  const initialAnimationValue = useSharedValue(0);

  const fetchProducts = () => {
    let categoryData = productsData?.filter(
      (elem: {category: string}) =>
        elem?.category?.toLowerCase() === params.item.name?.toLowerCase(),
    );
    let localArray = categoryData.map((product: IproductObj) => {
      const matchingCartItem = currentCartItems.find(
        (item: IproductObj) => product.itemId === item.itemId,
      );

      // isActive

      if (matchingCartItem) {
        return {...product, quantity: matchingCartItem.quantity};
      } else {
        return product;
      }
    });
    localArray.sort((a: IproductObj, b: IproductObj) => (!a.isActive ? 1 : -1));
    setProducts(localArray);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchProducts();
      initialAnimationValue.value = withTiming(1);
    }, 100);
  }, [currentCartItems]);

  const animationFlatlistStyles = useAnimatedStyle(() => {
    return {
      flexGrow: 1,
      transform: [
        {
          translateY: interpolate(
            initialAnimationValue.value,
            [0, 1],
            [winHeight, 0],
          ),
        },
      ],
    };
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getProducts(details?.token));
      setRefreshing(false);
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = React.useCallback(
    ({item, index}: {item: IPlaceOrderObj; index: number}) => {
      return <ProductCard key={index} item={item} />;
    },
    [],
  );

  const listEmptyComponent = React.useCallback(() => {
    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.noItemText}>No Items</Text>
      </View>
    );
  }, []);

  const footerComponent = React.useCallback(() => {
    return <View style={styles.footerContainer} />;
  }, []);

  const listITemSeparator = React.useCallback(() => {
    return <View style={styles.listSeparator} />;
  }, []);

  return (
    <CartWrapper>
      <View
        // id={`item.${params.item.id}.color`}
        style={[
          styles.container,
          {backgroundColor: params.item.bg_Color, paddingTop: top},
        ]}>
        <SharedElement style={StyleSheet.absoluteFill} id={'image'}>
          <Image style={styles.bg_Image} source={params.item.subImage} />
        </SharedElement>

        <HeaderWithBack
          buttonPress={() => navigation.goBack()}
          title={params.item.fullName}
        />

        <View style={styles.cardView}>
          <Animated.FlatList
            style={animationFlatlistStyles}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={styles.contentContainerStyles}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={listEmptyComponent}
            columnWrapperStyle={styles.contentContainer}
            data={products}
            ItemSeparatorComponent={listITemSeparator}
            ListFooterComponent={footerComponent}
            renderItem={renderItem}
          />
        </View>
        {error && (
          <View style={styles.errorView}>
            <NetworkError
              error={error}
              loading={loadingState}
              token={details.token}
              reducer={getProducts}
            />
          </View>
        )}
      </View>
    </CartWrapper>
  );
};

export default CategoryProducts;
