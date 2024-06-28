import {Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import {scaledValue, winHeight} from '~utils/styles.common';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomeScreenLoading = () => {
  var height =
    Platform.OS === 'android'
      ? winHeight / 3 - 170
      : winHeight < 700
      ? winHeight / 3 - 150
      : winHeight / 3 - 200;
  return (
    <View style={styles.contaniner}>
      <View style={{marginTop: 40, paddingHorizontal: 20, height: height}}>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              width={60}
              height={60}
              borderRadius={50}
            />
            <SkeletonPlaceholder.Item marginLeft={10}>
              <SkeletonPlaceholder.Item
                width={150}
                height={25}
                borderRadius={10}
              />
              <SkeletonPlaceholder.Item
                marginTop={6}
                width={100}
                height={20}
                borderRadius={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
      <View>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item paddingHorizontal={20}>
            <SkeletonPlaceholder.Item
              width={150}
              height={25}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={'100%'}
              marginTop={6}
              height={160}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
      {/* <View style={[styles.recentOrder, {height: recentHieight}]}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={150}
              height={30}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              justifyContent="space-between"
              flexDirection="row"
              marginTop={76}
              height={'100%'}
              width={'100%'}>
              <SkeletonPlaceholder.Item
                borderRadius={16}
                width={'48%'}
                height={220}
              />
              <SkeletonPlaceholder.Item
                borderRadius={16}
                width={'48%'}
                height={220}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View> */}
    </View>
  );
};

export default HomeScreenLoading;

const styles = StyleSheet.create({
  contaniner: {
    backgroundColor: '#fff',
    paddingTop: winHeight > 700 ? scaledValue(20) : 0,
    flex: 1,
  },
  recentOrder: {
    width: '100%',
    borderTopLeftRadius: 39,
    borderTopRightRadius: 39,
    zIndex: 1,
    paddingVertical: winHeight < 700 ? 0 : 20,
    marginTop: 70,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
});
