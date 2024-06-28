import {StyleSheet, View, Vibration, Text} from 'react-native';
import React from 'react';
import {
  colors,
  fontFamily,
  fontsSizes,
  scaledValue,
} from '~utils/styles.common';
import AnimatedLottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {RoutesName} from '~constants/routes';

const Ordersucess = ({route}: any) => {
  const navigation = useNavigation<any>();
  let nextScreen = route?.params?.nextRouteName ?? undefined;

  const goBack = () => {
    Vibration.vibrate(1000);
    setTimeout(() => {
      if (nextScreen !== undefined) {
        navigation.navigate(RoutesName.HOME_TAB, {
          screen: nextScreen,
        });
      } else {
        navigation.goBack();
      }
    }, 1500);
  };
  return (
    <View onLayout={goBack} style={styles.container}>
      <AnimatedLottieView
        style={styles.confeti}
        source={require('../../assets/celebration.json')}
        autoPlay={true}
        loop={false}
      />
      <View style={styles.content}>
        <Text style={styles.wooText}>WooohoooOOO!!</Text>
        <View style={styles.flex}>
          <View>
            <Text style={styles.enjoy}>Enjoy</Text>
            <Text style={styles.enjoy}>your</Text>
            <Text style={styles.enjoy}>Snack</Text>
          </View>
          <AnimatedLottieView
            style={styles.happy}
            source={require('../../assets/happy.json')}
            autoPlay={true}
            loop={true}
          />
        </View>
      </View>
    </View>
  );
};

export default Ordersucess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scaledValue(50),
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  confeti: {
    width: '100%',
    height: scaledValue(400),
  },
  content: {
    width: '100%',
    position: 'absolute',
    top: '30%',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  wooText: {
    fontFamily: fontFamily.prompt500,
    fontSize: fontsSizes.Heading,
    color: colors.wooBrown,
  },
  enjoy: {
    fontFamily: fontFamily.prompt700,
    color: colors.darkGreen,
    fontSize: scaledValue(74),
    lineHeight: scaledValue(100),
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  happy: {
    width: scaledValue(77),
    height: scaledValue(68),
    marginBottom: scaledValue(10),
    resizeMode: 'contain',
  },
});
