/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  colors,
  fontFamily,
  fontsSizes,
  scaledValue,
} from '~utils/styles.common';
import Svg, {Path} from 'react-native-svg';
import {touchSlope} from '~utils/appUtils';
import {IPlaceOrderObj} from '~state/slices/commonTypes';

type ICardCounterProps = {
  productDetails: IPlaceOrderObj;
  type?: 'small' | 'large';
  count?: number;
  updateCount?: () => void;
  decreaseCount?: () => void;
};

const CardCounter: React.FC<ICardCounterProps> = props => {
  return (
    <View style={styles.container}>
      {props.count === 0 ? (
        <TouchableOpacity onPress={props.updateCount} style={styles.flex}>
          <Text
            style={[
              styles.buttonHeadingNotAvailable,
              {
                fontSize:
                  props.type === 'small' ? fontsSizes.ten : fontsSizes.fourteen,
              },
            ]}>
            Add
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.counterView}>
          <TouchableOpacity onPress={props.decreaseCount} hitSlop={touchSlope}>
            <Svg width="10" height="4" viewBox="0 0 10 4" fill="none">
              <Path d="M0 0.941364H10V3.05863H0V0.941364Z" fill="white" />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.quantity}>{props.count}</Text>
          <TouchableOpacity onPress={props.updateCount} hitSlop={touchSlope}>
            <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <Path d="M0 3.94136H10V6.05863H0V3.94136Z" fill="white" />
              <Path
                d="M6.05862 -3.72215e-06L6.05862 10H3.94135L3.94135 -3.8147e-06L6.05862 -3.72215e-06Z"
                fill="white"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CardCounter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.counterBlue,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 20,
  },
  flex: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHeadingNotAvailable: {
    fontSize: scaledValue(14),
    fontFamily: fontFamily.prompt600,
    color: colors.white,
  },
  counterView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  minus: {
    width: 10,
    height: 2,
  },
  quantity: {
    color: colors.white,
    fontSize: fontsSizes.fourteen,
    fontFamily: fontFamily.prompt600,
  },
});
