/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import {colors, fontFamily, scaledValue} from '~utils/styles.common';
import {IGreenButtonProps} from '~components/types';
import {GOOGLE} from '~assets';
import FastImage from 'react-native-fast-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const Whitebutton: React.FC<IGreenButtonProps> = props => {
  const animationVlaue = useSharedValue(0);

  const heightStyle = useAnimatedStyle(() => {
    return {
      marginTop: interpolate(animationVlaue.value, [0, 1], [-10, 0]),
      paddingBottom: interpolate(animationVlaue.value, [0, 1], [10, 0]),
    };
  });

  const innerStyle = useAnimatedStyle(() => {
    return {
      borderRadius: interpolate(animationVlaue.value, [0, 1], [19, 19]),
    };
  });

  const executeClick = () => {
    animationVlaue.value = withSequence(
      withTiming(1, {
        duration: 100,
      }),
      withTiming(0, {
        duration: 100,
      }),
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={props.buttonPress}
      onPressIn={() => executeClick()}>
      <View style={styles.button}>
        <Animated.View style={[styles.height, heightStyle]}>
          <Animated.View style={[styles.inner, innerStyle]}>
            <FastImage source={GOOGLE} style={styles.googleIcon} />
            <Text style={styles.buttonText}>{props.buttonTitle}</Text>
          </Animated.View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Whitebutton;

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    elevation: 10,
    opacity: 1,
    top: 0,
    left: 0,
    width: '100%',
    height: scaledValue(60),
  },
  height: {
    borderRadius: 19,
    position: 'relative',
    top: 0,
    left: 0,
    backgroundColor: '#021708',
  },
  inner: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#021708',
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    position: 'relative',
    top: 0,
    left: 0,
    alignItems: 'center',
    height: '100%',
  },
  buttonText: {
    color: colors.green,
    fontSize: scaledValue(18),
    fontFamily: fontFamily.prompt700,
    marginLeft: 8,
  },
  googleIcon: {
    width: scaledValue(28),
    height: scaledValue(28),
    resizeMode: 'contain',
  },
});
