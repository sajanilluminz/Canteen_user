import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {ITabbarIcon} from '~components/types';
import {scaledValue} from '~utils/styles.common';

const TabBarForHome: React.FC<ITabbarIcon> = props => {
  if (props.focus === true) {
    return (
      <View style={styles.imageContainerWhite}>
        <Image style={styles.image} source={props.source} />
      </View>
    );
  } else {
    return (
      <View style={styles.imageContainerSimple}>
        <Image style={styles.image} source={props.source} />
      </View>
    );
  }
};

export default TabBarForHome;

const styles = StyleSheet.create({
  imageContainer: {
    borderTopWidth: 2,
    borderTopColor: 'rgba(53, 167, 122, 1)',
    paddingTop: scaledValue(5),
  },
  imageContainerWhite: {
    borderTopWidth: 2,
    borderTopColor: '#fff',
    paddingTop: scaledValue(5),
  },
  imageContainerSimple: {
    paddingTop: scaledValue(5),
  },
  image: {
    width: scaledValue(40),
    height: scaledValue(40),
  },
});
