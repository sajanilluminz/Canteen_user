import {StyleSheet, View, SafeAreaView, Text, Vibration} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {
  colors,
  fontFamily,
  fontsSizes,
  scaledValue,
} from '~utils/styles.common';
import {RoutesName} from '~constants/routes';

const RevertOrder = ({route}: any) => {
  const routeName = route?.params?.routeName ?? undefined;
  const navigation = useNavigation<any>();
  const animationFinishHandler = () => {
    if (routeName !== undefined) {
      navigation.navigate(RoutesName.HOME_TAB, {
        screen: routeName,
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.outer}>
      <View style={styles.container}>
        <AnimatedLottieView
          source={require('../../assets/sucess.json')}
          resizeMode={'cover'}
          loop={false}
          onLayout={() => Vibration.vibrate(500)}
          onAnimationFinish={animationFinishHandler}
          style={styles.lottie}
          autoSize={true}
          autoPlay={true}
        />
        <Text style={styles.itemReturned}>Item returned</Text>
        <Text style={styles.itemReturned}>successfully</Text>
      </View>
    </SafeAreaView>
  );
};

export default RevertOrder;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    height: scaledValue(300),
    width: scaledValue(300),
  },
  itemReturned: {
    fontSize: fontsSizes.thirty,
    fontFamily: fontFamily.prompt700,
    textAlign: 'center',
    color: colors.darkGreen,
  },
});
