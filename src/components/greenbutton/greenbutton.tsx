/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {colors, fontFamily, scaledValue} from '~utils/styles.common';
import {GestureResponderEvent} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
export interface IGreenButtonProps {
  buttonPress?: (event: GestureResponderEvent) => void;
  buttonTitle: string;
  buttonOuterStyles?: StyleProp<ViewStyle>;
  btnShadow?: number;
  titleStyles?: StyleProp<TextStyle>;
  btnInnerStyles?: StyleProp<TextStyle>;
  radius?: number;
}

const Greenbutton: React.FC<IGreenButtonProps> = props => {
  const animationValue = useSharedValue(0);
  let btnRadius = props.radius ?? 23;
  let btnShadow = props.btnShadow ?? 10;

  const heightStyle = useAnimatedStyle(() => {
    return {
      marginTop: interpolate(animationValue.value, [0, 1], [-9, 0]),
      paddingBottom: interpolate(animationValue.value, [0, 1], [btnShadow, 0]),
    };
  });

  const innerStyle = useAnimatedStyle(() => {
    return {
      borderRadius: interpolate(
        animationValue.value,
        [0, 1],
        [btnRadius, btnRadius],
      ),
    };
  });

  const executeClick = () => {
    animationValue.value = withSequence(
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
      <View style={[styles.button, props.buttonOuterStyles]}>
        <Animated.View style={[styles.height, heightStyle]}>
          <Animated.View
            style={[styles.inner, innerStyle, props.btnInnerStyles]}>
            <Text style={[styles.buttonText, props.titleStyles]}>
              {props.buttonTitle}
            </Text>
          </Animated.View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Greenbutton;

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
    borderRadius: 25,
    position: 'relative',
    top: 0,
    left: 0,
    backgroundColor: '#021708',
  },
  inner: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    position: 'relative',
    top: 0,
    left: 0,
    alignItems: 'center',
    height: '100%',
  },
  buttonText: {
    color: colors.whiteText,
    fontSize: scaledValue(18),
    fontFamily: fontFamily.prompt700,
  },
});
