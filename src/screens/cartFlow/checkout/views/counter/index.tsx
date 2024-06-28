import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fontFamily, fontsSizes} from '~utils/styles.common';
import {touchSlope} from '~utils/appUtils';

type ICounterProps = {
  quantity?: number;
  quantityAdditionHandler?: () => void;
  quantitySubtractionHandler?: () => void;
};

const Counter: React.FC<ICounterProps> = ({
  quantity = 0,
  quantityAdditionHandler,
  quantitySubtractionHandler,
}) => {
  return (
    <View style={styles.counterContainer}>
      <View style={styles.minusContainer}>
        <TouchableOpacity
          onPress={quantitySubtractionHandler}
          hitSlop={touchSlope}>
          <View style={styles.minus} />
        </TouchableOpacity>
      </View>
      <View style={styles.numberContainer}>
        <Text style={styles.counterNumber}>{quantity}</Text>
      </View>
      <View style={styles.plusContainer}>
        <TouchableOpacity
          onPress={quantityAdditionHandler}
          hitSlop={touchSlope}>
          <View style={styles.plus}>
            <View style={styles.plusLeft} />
            <View style={styles.plusTop} />
            <View />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: 'row',
  },
  minusContainer: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    width: 43,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.green,
  },
  plusContainer: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 1,
    width: 43,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.green,
  },
  minus: {
    backgroundColor: colors.black,
    width: 14,
    height: 2,
  },
  numberContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: 43,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.green,
  },
  counterNumber: {
    color: colors.black,
    fontSize: fontsSizes.fourteen,
    fontFamily: fontFamily.prompt500,
  },
  plus: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusLeft: {
    backgroundColor: colors.black,
    width: 14,
    height: 2,
  },
  plusTop: {
    position: 'absolute',
    transform: [{rotate: '90deg'}],
    backgroundColor: colors.black,
    width: 14,
    height: 2,
  },
});
