/* eslint-disable no-sparse-arrays */
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {styles} from './styles';

const Loader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        <ActivityIndicator
          style={{width: 50, height: 50}}
          size={50}
          color="rgba(36, 150, 255, 0.9)"
        />
      </View>
    </View>
  );
};

export default Loader;
