import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {DUMY_IMG} from '~assets';
import Price from '~components/price/price';
import {
  colors,
  fontFamily,
  fontsSizes,
  scaledValue,
} from '~utils/styles.common';
import Counter from '../counter';

const CheckoutItemCard = () => {
  let image = null;
  return (
    <View style={styles.itemContainer}>
      <View>
        <FastImage
          source={
            image
              ? {
                  uri: image,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }
              : DUMY_IMG
          }
          style={styles.mainImage}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={styles.rigthContainer}>
        <View style={styles.productDetailContainerOuter}>
          <View>
            <Text style={styles.name}>Tiger</Text>
            <Text style={styles.categroyText}>Biscuits</Text>
          </View>
          <Price amount={35} fontSize={fontsSizes.sixteen} />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity>
            <Text style={styles.remove}>Remove</Text>
          </TouchableOpacity>
          <Counter />
        </View>
      </View>
    </View>
  );
};

export default CheckoutItemCard;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
  },
  productDetailContainerOuter: {
    flexDirection: 'row',
    marginRight: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  mainImage: {
    width: scaledValue(62),
    height: scaledValue(72),
    position: 'relative',
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },
  name: {
    fontFamily: fontFamily.prompt500,
    fontSize: scaledValue(14),
    width: scaledValue(120),
    color: '#042F1F',
  },
  categroyText: {
    color: '#5E5C66',
    fontFamily: fontFamily.prompt400,
    fontSize: scaledValue(10),
  },
  remove: {
    color: colors.red,
  },
  bottomContainer: {
    flex: 1,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  rigthContainer: {
    flex: 1,
  },
});
