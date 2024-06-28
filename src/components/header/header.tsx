import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fontFamily, scaledValue} from '~utils/styles.common';

type iHeaderProp = {
  title: string;
};

const Header: React.FC<iHeaderProp> = props => {
  return (
    <View>
      <Text style={styles.heading}>{props.title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  heading: {
    color: colors.darkGreen,
    fontFamily: fontFamily.prompt700,
    fontSize: scaledValue(28),
  },
});
