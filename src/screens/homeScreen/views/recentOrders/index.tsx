import {Animated, View, FlatList} from 'react-native';
import React, {memo, useCallback, useEffect, useMemo, useRef} from 'react';
import {styles} from './styles';
import {winHeight, windowWidth} from '~utils/styles.common';
import {useAppSelector} from '~state/store';
import RecentCell from '~screens/homeScreen/views/recentCardCell';
import {IRecentObj} from '~state/slices/commonTypes';

type IRecentOrderProps = {
  recentOrderData: IRecentObj[];
};

const RecentOrders: React.FC<IRecentOrderProps> = ({recentOrderData}) => {
  var scrollX = useRef(new Animated.Value(0)).current;
  const itemSize = useMemo(() => windowWidth / 2.0, []);
  const flatlistRef = useRef<FlatList | null>(null);
  const loadingState = useAppSelector(state => state.recentOrder.loading);
  const size = useMemo(() => windowWidth, []);

  const footerComponent = useCallback(() => {
    return (
      <View
        style={
          recentOrderData?.length % 2 === 0
            ? styles.footerWidth
            : {width: itemSize}
        }
      />
    );
  }, [itemSize, recentOrderData?.length]);

  useEffect(() => {
    flatlistRef.current?.scrollToOffset({animated: true, offset: 0});
  }, [recentOrderData]);

  const renderItemRecent = ({
    item,
    index,
  }: {
    item: IRecentObj;
    index: number;
  }) => {
    let cellIndex = index - (index % 2);
    const inputRange = [
      (cellIndex - 1) * itemSize,
      cellIndex * itemSize,
      (cellIndex + 1) * itemSize,
    ];
    const interpolateRotating = scrollX.interpolate({
      inputRange,
      outputRange: ['90deg', '0deg', '-90deg'],
    });
    scrollX.setValue(0);
    return (
      <View
        style={{
          width: itemSize,
          // height: winHeight > 700 ? 1.3 * itemSize : 1.2 * itemSize,
          height: 1.3 * itemSize,
        }}>
        <View
          style={[
            styles.renderContainer,
            index % 2 === 0 ? styles.marginEven : styles.marginOdd,
          ]}>
          {/* <View style={{backgroundColor: 'red', flex: 1}}></View> */}
          <RecentCell
            key={index}
            interpolateRotating={interpolateRotating}
            item={item}
            loading={loadingState}
            index={index}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        horizontal
        contentContainerStyle={styles.contentContainer}
        data={recentOrderData}
        renderItem={renderItemRecent}
        ref={flatlistRef}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        initialNumToRender={10}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        snapToInterval={size}
        snapToAlignment={'start'}
        pagingEnabled={true}
        scrollEventThrottle={16}
        ListFooterComponent={footerComponent}
      />
    </View>
  );
};

export default memo(RecentOrders);
