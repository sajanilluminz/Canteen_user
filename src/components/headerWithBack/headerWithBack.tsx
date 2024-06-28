import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {BACK_ICON} from '~assets';
import {scaledValue, fontFamily, colors} from '~utils/styles.common';
import FastImage from 'react-native-fast-image';

type IButtonProps = {
  buttonPress: (event: GestureResponderEvent) => void;
  title: string;
};

const HeaderWithBack: React.FC<IButtonProps> = props => {
  return (
    <Pressable
      android_ripple={{foreground: true, borderless: false}}
      onPress={props.buttonPress}>
      <View style={styles.header}>
        <FastImage style={styles.backButton} source={BACK_ICON} />
        <Text style={styles.heading}>{props.title}</Text>
      </View>
    </Pressable>
  );
};

export default HeaderWithBack;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: scaledValue(26),
    height: scaledValue(20),
    resizeMode: 'contain',
  },
  heading: {
    fontFamily: fontFamily.prompt700,
    fontSize: scaledValue(20),
    color: colors.darkGreen,
  },
});
