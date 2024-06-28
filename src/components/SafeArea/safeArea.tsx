import {StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scaledValue} from '~utils/styles.common';

type ISafeAreaProps = {
  children?: JSX.Element | JSX.Element[] | undefined;
  background?: string | '#fff';
};

const SafeArea: React.FC<ISafeAreaProps> = props => {
  return (
    <SafeAreaView
      style={[styles.safeAreaView, {backgroundColor: props.background}]}>
      {props.children}
    </SafeAreaView>
  );
};

export default SafeArea;

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    paddingHorizontal: scaledValue(23),
    paddingTop: scaledValue(23),
  },
});
