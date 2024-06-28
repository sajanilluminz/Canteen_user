import React, {useCallback, useEffect} from 'react';
import {styles} from './splashScreen.styles';
import AnimatedLottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {RoutesName} from '~constants/routes';
import {StatusBar} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAppSelector} from '~state/store';
import {getUserDetails} from '~state/slices/signup/signupSlice';
import LinearGradient from 'react-native-linear-gradient';
import RNSplashScreen from 'react-native-splash-screen';

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const isUserDetails = useAppSelector(getUserDetails);

  useEffect(() => {
    RNSplashScreen.hide();
    GoogleSignin.configure({
      webClientId:
        '193708572397-5jtdnou2gbki96qguukp41oth05hr3no.apps.googleusercontent.com',
      hostedDomain: 'illuminz.com',
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      animationFinishHandler();
    }, 1000);
  }, []);

  const animationFinishHandler = useCallback(() => {
    if (isUserDetails.token) {
      navigation.replace(RoutesName.HOME_TAB);
    } else {
      navigation.replace(RoutesName.GET_STARTED);
    }
  }, [isUserDetails.token, navigation]);

  return (
    <LinearGradient
      colors={['rgba(48, 119, 36, 0.9)', 'rgba(58, 223, 223, 1)']}
      useAngle={true}
      angle={75}
      style={styles.mainContainer}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <AnimatedLottieView
        autoPlay={true}
        autoSize={true}
        loop={false}
        source={require('../../assets/splash.json')}
        style={styles.width}
      />
    </LinearGradient>
  );
};

export default SplashScreen;
