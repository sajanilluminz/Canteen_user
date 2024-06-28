/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import {Image, StatusBar, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {withSpring} from 'react-native-reanimated';
import {Easing} from 'react-native-reanimated';
import {productsData} from './produtsData';
import {Shadow} from 'react-native-shadow-2';
import Whitebutton from '~components/greenbutton/whiteButton';
import AnimatedLoader from '~components/animatedLoader';
import {googleSignInHandler} from '~utils/googleLogin';
import {
  setErrorState,
  signUpUser,
  updateUserSecondaryImage,
} from '~state/slices/signup/signupSlice';
import {iuserSignUpDataType} from '~constants/user/userSignupKeys';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RoutesName} from '~constants/routes';
import {getRecentOrders} from '~state/slices/recentitems/recentSlice';
const GetStartedNew = () => {
  const initialValueLeftProduct = useSharedValue(0);
  const [clickable, setClickable] = useState(true);
  const intialValueRightProduct = useSharedValue(-1000);
  const transformation = useSharedValue(200);
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const [loader, showLoader] = useState<any>(false);
  const [userDetail, error] = useSelector((state: any) => [
    state.user.userDetails,
    state.user.error,
  ]);

  useEffect(() => {
    if (userDetail.token) {
      showLoader(false);
      dispatch(getRecentOrders(userDetail.token));
      navigation.replace(RoutesName.HOME_TAB);
    }
    if (error) {
      if (error?.response?.data?.message !== undefined) {
        showLoader(false);
        if (error?.response) {
          toast.show(`${error?.response?.data?.message}`, {
            type: 'error',
          });
        } else {
          toast.show(`${error.message}`, {type: 'error'});
        }
        toast.hideAll();
      }
      dispatch(setErrorState());
    }
  }, [userDetail?.token, error]);

  const buttonAnimationStyles = useAnimatedStyle(() => {
    return {
      width: '100%',
      transform: [{translateY: transformation.value}],
    };
  });

  const rowAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: initialValueLeftProduct.value,
        },
      ],
    };
  });
  const rowSecAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: intialValueRightProduct.value,
        },
      ],
    };
  });

  useEffect(() => {
    loopProductAnimationLeft();
    buttonAnimation();
    loopProductAnimationRight();
  }, []);

  const buttonAnimation = () => {
    transformation.value = withSpring(-0, {
      // transformation.value = withSpring(-20, {
      stiffness: 200,
      damping: 6,
    });
  };

  const loopProductAnimationRight = () => {
    intialValueRightProduct.value = withRepeat(
      withSequence(
        withTiming(0, {
          duration: 15000,

          easing: Easing.linear,
        }),
        withTiming(-1000, {
          duration: 15000,
          easing: Easing.linear,
        }),
      ),
      -1,
    );
  };

  const loopProductAnimationLeft = () => {
    initialValueLeftProduct.value = withRepeat(
      withSequence(
        withTiming(-1000, {
          duration: 15000,
          easing: Easing.linear,
        }),
        withTiming(0, {
          duration: 15000,
          easing: Easing.linear,
        }),
      ),
      -1,
    );
  };

  const googleLoginHandler = async () => {
    if (clickable) {
      setClickable(false);
      try {
        showLoader(true);
        setTimeout(async () => {
          const userDetails = await googleSignInHandler();
          if (userDetails) {
            let credentials: iuserSignUpDataType = {
              name: userDetails.name,
              email: userDetails.email,
              profileUrl: userDetails.image,
              socialType: userDetails.platform,
              registerToken: userDetails.token,
              social_login_id: userDetails.socialId,
            };
            dispatch(signUpUser(credentials));
            dispatch(updateUserSecondaryImage(userDetails.image ?? ''));
          }
        }, 200);
      } catch (error: any) {
        showLoader(false);
        if (error?.message === 'NETWORK_ERROR') {
          toast.show('Please check your Internet connection', {
            type: 'error',
          });
        }
      }
    }

    setTimeout(() => {
      setClickable(true);
    }, 1000);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <View style={styles.itemLineTop}>
        <Animated.View style={[styles.lineContainer, rowAnimatedStyles]}>
          {productsData.map(products => {
            return (
              <Image
                key={products.id}
                source={products.image}
                style={styles.item}
              />
            );
          })}
        </Animated.View>
        <Animated.View style={[styles.lineContainer, rowSecAnimatedStyles]}>
          {productsData.map(products => {
            return (
              <Image
                key={products.id}
                source={products.image}
                style={styles.item}
              />
            );
          })}
        </Animated.View>
        <Animated.View style={[styles.lineContainer, rowAnimatedStyles]}>
          {productsData.map(products => {
            return (
              <Image
                key={products.id}
                source={products.image}
                style={styles.item}
              />
            );
          })}
        </Animated.View>
      </View>
      <View style={styles.bottomContainer}>
        <Shadow startColor="#fff" distance={90} style={styles.shadow}>
          <View style={styles.displayFlex}>
            <Text style={styles.DiscoverText}>Discover the </Text>
            <Text style={styles.DiscoverText}>illuminz Canteen </Text>
            <Text style={styles.descriptionText}>
              Let’s get started to give the break to
            </Text>
            <Text style={styles.descriptionText}>all your cravings</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Animated.View style={buttonAnimationStyles}>
              <Whitebutton
                buttonPress={googleLoginHandler}
                buttonTitle={'Sign in with Google'}
              />
            </Animated.View>
          </View>
        </Shadow>
      </View>
      {loader && (
        <View style={styles.loaderStyles}>
          <AnimatedLoader />
        </View>
      )}
    </View>
  );
};

export default GetStartedNew;
