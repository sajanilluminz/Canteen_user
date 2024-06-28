import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '~utils/styles.common';

const OfflineNotice = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No internet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
    marginTop: 50,
  },
  text: {
    color: colors.white,
    textAlign: 'center',
  },
});

export default OfflineNotice;
