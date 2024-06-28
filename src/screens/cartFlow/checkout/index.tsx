import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  colors,
  fontFamily,
  fontsSizes,
  scaledValue,
} from '~utils/styles.common';
import HeaderWithBack from '~components/headerWithBack/headerWithBack';
import {useNavigation} from '@react-navigation/native';
import CheckoutItemCard from './views/checkoutItemCard';
import Price from '~components/price/price';
import Greenbutton from '~components/greenbutton/greenbutton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CheckOut = () => {
  const navigation = useNavigation();
  const top = useSafeAreaInsets().top + 20;
  return (
    <View style={[styles.outerContainer, {paddingTop: top}]}>
      <HeaderWithBack
        buttonPress={() => navigation.goBack()}
        title={'CheckOut'}
      />
      <View style={styles.container}>
        <Text style={styles.yourItems}>Your Items ( 1 )</Text>
        <CheckoutItemCard />
        <CheckoutItemCard />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.subTotal}>
          <Text style={styles.subTotalText}>Subtotal</Text>
          <Price amount={100} fontSize={fontsSizes.sixteen} />
        </View>
        <Greenbutton buttonTitle={"I'm taking it"} />
      </View>
    </View>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  yourItems: {
    marginTop: 20,
    fontFamily: fontFamily.prompt700,
    fontSize: scaledValue(16),
    color: colors.darkGreen,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 54,
    borderTopWidth: 0,
    elevation: 6,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  subTotal: {
    flexDirection: 'row',
    marginBottom: 25,
    justifyContent: 'space-between',
  },
  subTotalText: {
    color: colors.darkGreen,
    fontSize: fontsSizes.sixteen,
    fontFamily: fontFamily.prompt600,
  },
});
