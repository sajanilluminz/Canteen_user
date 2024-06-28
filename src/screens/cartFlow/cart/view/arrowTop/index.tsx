import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
} from 'react-native-reanimated';
import {IC_ARROW_TOP} from '~assets';
import {withTiming} from 'react-native-reanimated';
import {Easing} from 'react-native-reanimated';

const ArrowTop = () => {
  const imagePosition = useSharedValue(0);

  // useEffect(() => {
  //   imagePosition.value = withRepeat(
  //     withTiming(-5, {
  //       easing: Easing.inOut(Easing.ease),
  //       duration: 1500,
  //     }),
  //     -1,
  //   );
  // }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: imagePosition.value}],
    };
  });

  return (
    <View>
      <Animated.Image style={imageAnimatedStyle} source={IC_ARROW_TOP} />
    </View>
  );
};

export default ArrowTop;
