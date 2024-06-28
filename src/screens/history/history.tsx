/* eslint-disable react-hooks/exhaustive-deps */

import {
  Text,
  StatusBar,
  View,
  Image,
  Platform,
  SectionList,
  RefreshControl,
  TouchableOpacity,
  DefaultSectionT,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {styles} from './history.styles';
import SafeArea from '~components/SafeArea/safeArea';
import Header from '~components/header/header';
import {colors, fontFamily, scaledValue, winHeight} from '~utils/styles.common';
import {useAppSelector} from '~state/store';
import {NO_ORDERS} from '~assets';
import Price from '~components/price/price';
import {useDispatch} from 'react-redux';
import {getUserDetails} from '~state/slices/signup/signupSlice';
import NetworkError from '~components/error/errorScreen';
import {getHistoryByMonths} from '~state/slices/orderHistoryMonthlyAmount';
import {
  getOrderHistory,
  getOrderHistoryErrorFromState,
  getOrderHistoryFromState,
  getOrderHistoryLoadMoreFromState,
  getOrderHistoryLoadingStateFromState,
} from '~state/slices/orderHistory/orderHistorySlice';
import {getTransactionHistory} from '~state/slices/transactions/transactionSlice';
import CartWrapper from '~screens/cartFlow/cartWrapper';
import HistoryCard from './views/historycard';
import {IRecentObj} from '~state/slices/commonTypes';
import {getDate} from '~components/getTimeinSec';
import HistorySection from './HistorySection';
// import HistorySection from './HistorySection/HistorySection';

const History = () => {
  const details = useAppSelector(getUserDetails);
  const loading = useAppSelector(getOrderHistoryLoadingStateFromState);
  const error = useAppSelector<any>(getOrderHistoryErrorFromState);
  const loadMore = useAppSelector<any>(getOrderHistoryLoadMoreFromState);
  const [limit, setLimit] = useState(50);
  const history = useAppSelector(getOrderHistoryFromState);
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch<any>();

  const sectionListRef = useRef<SectionList<IRecentObj, DefaultSectionT>>(null);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getOrderHistory({authToken: details?.token, limit: 50}));
      dispatch(getTransactionHistory(details?.token));
      setRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    dispatch(getOrderHistory({authToken: details?.token, limit: 50}));
    dispatch(getTransactionHistory(details?.token));
  }, []);

  const renderSectionHeader = useCallback(
    ({section: {title}}: {section: {title: Date}}) => {
      if (loading) {
        return (
          <View style={{backgroundColor: 'white'}}>
            <View style={styles.separator} />
            <View style={styles.dateLoading} />
          </View>
        );
      } else {
        return (
          <View style={{backgroundColor: 'white'}}>
            <View style={styles.separator} />
            <Text style={styles.title}>{getDate(title)}</Text>
          </View>
        );
      }
    },
    [history, loading],
  );

  const itemSeparator = useCallback(() => {
    return <View style={styles.divider} />;
  }, []);

  const sectionSeparator = useCallback(() => {
    return <View style={styles.sectionDivider} />;
  }, []);

  const didloadMore = () => {
    setLimit(limit + 20);
    dispatch(getOrderHistory({authToken: details?.token, limit: limit}));
  };

  const listEmptyComponent = useCallback(() => {
    return (
      <View style={styles.container}>
        <Image style={styles.noRecentImage} source={NO_ORDERS} />
        <Text style={styles.noRecent}>No order yet!</Text>
        <Text style={styles.noRecentText}>You don’t have any order yet</Text>
      </View>
    );
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: IRecentObj; index: number}) => {
      if (loading) {
        return (
          <View key={index} style={styles.loadingContainer}>
            <View style={styles.loadingContainerLeft}>
              <View style={styles.contentLeft} />
              <View style={styles.centerContainer}>
                <View style={styles.lineTop} />
                <View style={styles.lineCenter} />
                <View style={styles.lineBottom} />
              </View>
            </View>
            <View style={styles.endContainer}>
              <View style={styles.endTop} />
              <View style={styles.endBottom} />
              <View />
            </View>
          </View>
        );
      } else {
        return <HistoryCard index={index} item={item} />;
      }
    },
    [history, loading],
  );

  const footerComponent = useCallback(() => {
    return (
      <View>
        {(loadMore ?? false) && (
          <TouchableOpacity onPress={didloadMore}>
            <Text
              style={{
                color: colors.green,
                fontFamily: fontFamily.prompt500,
                fontSize: scaledValue(13),
              }}>
              Load More
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.footer} />
      </View>
    );
  }, [loadMore]);

  const loadingdata = [
    {
      title: '',
      data: ['0', '1', '2', '3'],
    },
    {
      title: '',
      data: ['0', '1', '2', '3'],
    },
    {
      title: '',
      data: ['0', '1', '2', '3'],
    },
    {
      title: '',
      data: ['0', '1', '2', '3'],
    },
  ];

  return (
    <CartWrapper
      bottom={winHeight > 700 ? (Platform.OS === 'ios' ? 90 : 70) : 70}>
      <SafeArea background={colors.white}>
        <StatusBar barStyle={'dark-content'} />
        <>
          <Header title={'Order History'} />
          {history.length > 0 && (
            <View style={styles.unpaidContainer}>
              <View style={styles.amountToPay}>
                <Text style={styles.unpaidHeader}>Amount to pay</Text>
                <Price amount={details?.Amount} fontSize={20} />
              </View>
              <Text>
                <Text style={styles.noteText}>Note: </Text>
                <Text style={styles.noteStatement}>
                  Newly added items could be deleted within 2 mins
                </Text>
              </Text>
            </View>
          )}
          <View style={styles.cardContainer}>
            <SectionList
              showsVerticalScrollIndicator={false}
              sections={loading ? loadingdata : history}
              ItemSeparatorComponent={itemSeparator}
              contentContainerStyle={styles.contentContainer}
              SectionSeparatorComponent={sectionSeparator}
              renderSectionHeader={renderSectionHeader}
              maxToRenderPerBatch={10}
              ref={sectionListRef}
              keyExtractor={(item, index) => `${index}${item.itemId}`}
              refreshControl={
                <RefreshControl
                  tintColor={colors.green}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              ListFooterComponent={footerComponent}
              ListEmptyComponent={listEmptyComponent}
              renderItem={renderItem}
            />
          </View>
        </>
        {error && (
          <View style={styles.errorView}>
            <NetworkError
              error={error}
              loading={loading}
              reducer={getHistoryByMonths}
              token={details.token}
            />
          </View>
        )}
      </SafeArea>
    </CartWrapper>
  );
};

// export default History;

// const HistoryS = () => {
//   return <HistorySection/>
// }
export default HistorySection;
