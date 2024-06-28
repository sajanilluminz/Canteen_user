/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  interpolate,
  useSharedValue,
  withTiming,
  runOnJS,
  useAnimatedReaction,
  interpolateColor,
} from 'react-native-reanimated';
import NetworkError from '~components/error/errorScreen';
import {scaledValue, winHeight} from '~utils/styles.common';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, useAppSelector} from '~state/store';
import UserHeader from './views/userHeader';
import {getUserDetails} from '~state/slices/signup/signupSlice';
import {useNavigation} from '@react-navigation/native';
import {SMILE} from '~assets';
import SearchBar from './views/searchBar';
import {getProducts} from '~state/slices/allproducts/allProductsSlice';
import {getRecentOrders} from '~state/slices/recentitems/recentSlice';
import {IproductObj} from '~state/slices/commonTypes';
import {RoutesName} from '~constants/routes';
import RecentOrders from './views/recentOrders';
import CartWrapper from '~screens/cartFlow/cartWrapper';
import {getCartItemsFromState} from '~state/slices/cart/cartSlice';
import {getOrderHistory} from '~state/slices/orderHistory/orderHistorySlice';

const HomeScreen = () => {
  const gradientColors = ['#307724', '#3ADFDF'];
  const [showRecent, setShowRecent] = useState(false);
  const details = useAppSelector(getUserDetails);
  const flatlistRef = useRef<FlatList | null>(null);
  const [showCross, setShowCross] = useState(false);

  const inputRef = useRef<TextInput | null>(null);
  const scrollRef = useRef<ScrollView | null>(null);

  const currentCartItems = useSelector(getCartItemsFromState);
  const dispatch = useDispatch<any>();
  const top = useSafeAreaInsets().top + 20;
  const navigation = useNavigation<any>();
  const productsData = useAppSelector(
    (state: RootState) => state.products.products,
  );
  // const productsData = [...(arrayL ?? [])].sort(
  //   (a: IproductObj, b: IproductObj) => (!a.isActive ? 1 : -1),
  // );

  const loadingState = useAppSelector(state => state.recentOrder.loading);
  const opacity = useSharedValue(1);

  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchArray, setSearchArray] = useState<IproductObj[]>(productsData);
  const [recentOrderData, error] = useSelector((state: RootState) => [
    state.recentOrder.recentData,
    state.recentOrder.error,
  ]);
  useEffect(() => {
    console.log('HIT');
    //Platform.OS === 'android' && checkAppVersion();
    dispatch(getProducts(details?.token));
    dispatch(getRecentOrders(details?.token));
  }, []);

  useEffect(() => {
    setSearchArray(productsData);
  }, [productsData]);

  useEffect(() => {
    if (recentOrderData?.length) {
      revertSearchAnimation();
    }
  }, [recentOrderData]);

  useAnimatedReaction(
    () => {
      return opacity.value;
    },
    result => {
      // runOnJS(setShowCross)(result < 0.5);
      if (result < 0.5) {
        runOnJS(setShowCross)(true);
      }
      if (result > 0.5) {
        runOnJS(setShowCross)(false);
      }
    },
    [],
  );

  var comHeight =
    recentOrderData?.length === 0 || recentOrderData === null
      ? Platform.OS === 'android'
        ? winHeight / 2 - 155
        : winHeight / 3.5
      : Platform.OS === 'android'
      ? winHeight / 3 - 170
      : winHeight < 700
      ? winHeight / 3 - 150
      : winHeight / 3 - 200;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      position: 'absolute',
      paddingHorizontal: 20,
    };
  });

  const searchBarStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(opacity.value, [1, 0], [comHeight, 0]),
        },
      ],
    };
  });

  const recentOrderAnimation = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      marginTop: comHeight + 35,
      // height: -1, //interpolate(opacity.value, [0, 1], [-1, 0]),
      backgroundColor: interpolateColor(
        opacity.value,
        [1, 0.8],
        ['#fff', 'transparent'],
      ),
      transform: [
        {
          scaleY: interpolate(opacity.value, [1, 0.5], [1, 0]),
        },
      ],
    };
  });

  let heightSearchList = scaledValue(210);
  const flatlistAnimatedStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(opacity.value, [1, 0], [0, heightSearchList]),
    };
  });

  const searchProductHandler = (value: string) => {
    flatlistRef?.current?.scrollToOffset({animated: false, offset: 0});
    setSearchInputValue(value);

    if (value === '') {
      let localArray = productsData.map((product: IproductObj) => {
        const matchingCartItem = currentCartItems.find(
          (item: IproductObj) => product.itemId === item.itemId,
        );

        if (matchingCartItem) {
          return {...product, quantity: matchingCartItem.quantity};
        } else {
          return product; // Return the original product if no match is found
        }
      });
      setSearchArray(localArray);
    } else {
      var res = productsData?.filter(
        (item: {name: string; category: string}) => {
          return (
            item.name.toUpperCase().includes(value.toUpperCase().trim()) ||
            item.category.toUpperCase().includes(value.toUpperCase().trim())
          );
        },
      );
      let resArray = res.map((product: IproductObj) => {
        const matchingCartItem = currentCartItems.find(
          (item: IproductObj) => product.itemId === item.itemId,
        );

        if (matchingCartItem) {
          return {...product, quantity: matchingCartItem.quantity};
        } else {
          return product; // Return the original product if no match is found
        }
      });
      setSearchArray(resArray);
    }
  };

  useEffect(() => {
    let flag = recentOrderData?.length === 0 || recentOrderData === null;
    setShowRecent(!flag);
  }, [recentOrderData]);

  const playSearchAnimation = () => {
    console.log('qwertyuiop');

    // inputRef.current?.focus();
    // scrollRef?.current?.scrollTo({
    //   y: 0,
    //   animated: true,
    // });
    opacity.value = withTiming(0, {
      duration: 300,
    });
  };

  const revertSearchAnimation = () => {
    inputRef.current?.blur();
    setSearchInputValue('');
    setTimeout(() => {
      opacity.value = withTiming(1, {
        duration: 300,
      });
    }, 20);
  };

  useEffect(() => {
    if (currentCartItems.length) {
      let localArray = productsData.map((product: IproductObj) => {
        const matchingCartItem = currentCartItems.find(
          (item: IproductObj) => product.itemId === item.itemId,
        );

        if (matchingCartItem) {
          return {...product, quantity: matchingCartItem.quantity};
        } else {
          return product;
        }
      });
      localArray.sort((a: IproductObj, b: IproductObj) =>
        !a.isActive ? 1 : -1,
      );
      setSearchArray(localArray);
    } else {
      setSearchArray(productsData);
    }
  }, [currentCartItems, productsData]);

  const navigateToProfile = useCallback(() => {
    navigation.navigate(RoutesName.ACCOUNTS);
  }, []);

  // const scrollRef = React.createRef<ScrollView>();

  return (
    <View style={styles.container}>
      <CartWrapper
        bottom={winHeight > 700 ? (Platform.OS === 'ios' ? 90 : 70) : 70}>
        <LinearGradient
          colors={gradientColors}
          style={[styles.container, {paddingTop: top}]}
          start={{x: 0.0, y: 0.5}}
          end={{x: 1.0, y: 0.5}}
          locations={[0.01, 0.9794]}>
          <StatusBar
            translucent={true}
            barStyle={'default'}
            backgroundColor={'transparent'}
          />
          <ScrollView
            ref={scrollRef}
            // scrollEnabled={!showCross}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps={'always'}
            style={styles.scrollViewStyles}>
            <Animated.View style={animatedStyle}>
              <UserHeader
                name={details.name}
                image={details.photo}
                profileClickHandler={navigateToProfile}
              />
            </Animated.View>
            <Animated.View style={[styles.midContainer, searchBarStyle]}>
              <View style={styles.hungeryContainer}>
                <Image style={styles.smile} source={SMILE} />
                <Text style={styles.hungryText}>Hungry Kya?</Text>
              </View>
              <Text style={styles.question}>
                What would you like to eat today?
              </Text>
              <SearchBar
                inputRef={inputRef}
                value={searchInputValue}
                onTextChange={e => searchProductHandler(e)}
                onFocus={playSearchAnimation}
                searchButtonHandler={playSearchAnimation}
                searchData={searchArray}
                flatlistAnimatedStyles={flatlistAnimatedStyles}
                showCross={showCross}
                crossButtonHandler={revertSearchAnimation}
                flatlistRef={flatlistRef}
              />
            </Animated.View>
            {/* {showRecent && !showCross && ( */}
            {showRecent && (
              <Animated.View style={[styles.recentOrder, recentOrderAnimation]}>
                <Text style={styles.recentOrderHeading}>Recent Orders</Text>
                <RecentOrders recentOrderData={recentOrderData} />
                <View style={styles.bottomSpacer} />
              </Animated.View>
            )}
          </ScrollView>
        </LinearGradient>
      </CartWrapper>
      {error && (
        <View style={styles.errorContainer}>
          <NetworkError
            isPadding={20}
            error={error}
            loading={loadingState}
            reducer={getRecentOrders}
            reducerSec={getProducts}
            reducerfourth={getOrderHistory}
            token={details?.token}
          />
        </View>
      )}
    </View>
  );
};

export default memo(HomeScreen);
