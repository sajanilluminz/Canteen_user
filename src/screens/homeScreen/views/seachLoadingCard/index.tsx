import {StyleSheet, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scaledValue} from '~utils/styles.common';

const SearchCardLoading = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.card} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default SearchCardLoading;

const styles = StyleSheet.create({
  card: {
    width: scaledValue(113),
    height: scaledValue(144),
    backgroundColor: '#FBF6F2',
    borderRadius: 16,
    position: 'relative',
    top: 0,
    left: 0,
  },
  container: {
    paddingTop: 50,
    marginRight: 20,
  },
});
