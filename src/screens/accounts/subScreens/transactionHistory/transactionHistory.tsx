/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, Image, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderWithBack from '~components/headerWithBack/headerWithBack';
import {useNavigation} from '@react-navigation/native';
import SafeArea from '~components/SafeArea/safeArea';
import {styles} from './styles';
import Price from '~components/price/price';
import Br from '~components/br/br';

import {colors, fontsSizes} from '~utils/styles.common';
import {RootState, useAppSelector} from '~state/store';
import {NO_TRANSACTIONS} from '~assets';
import {getUserDetails} from '~state/slices/signup/signupSlice';
import moment from 'moment';
import NetworkError from '~components/error/errorScreen';
import {useDispatch} from 'react-redux';
import {
  getTransactionHistory,
  transactionHistoryLoadingState,
} from '~state/slices/transactions/transactionSlice';
import AnimatedLoader from '~components/animatedLoader';

const TransactionHistory = () => {
  const navigation = useNavigation();
  const [transactionHistory, error] = useAppSelector((state: RootState) => [
    state.transactions.transactions,
    state.transactions.error,
  ]);
  const dispatch = useDispatch<any>();
  const details = useAppSelector(getUserDetails);
  const loadingState = useAppSelector(transactionHistoryLoadingState);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const transactionDateFormat = (utcTimeOrder: string) => {
    var date = moment.utc(utcTimeOrder).format('YYYY-MM-DD HH:mm:ss');
    var stillUtc = moment.utc(date).toDate();
    let localDate = moment(stillUtc).local().format('MMM DD,YYYY');
    let localTime = moment(stillUtc).local().format('hh:mm A');
    let finalDate = `${localDate} at ${localTime}`;
    return finalDate;
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const fetchData = () => {
    dispatch(getTransactionHistory(details?.token));
  };

  useEffect(() => {
    dispatch(getTransactionHistory(details?.token));
  }, []);

  useEffect(() => {
    if (
      transactionHistory?.data?.length === 0 ||
      transactionHistory?.data === null
    ) {
      setShowTransactionHistory(false);
    } else {
      setShowTransactionHistory(true);
    }
  }, [transactionHistory]);

  return (
    <>
      <SafeArea background={colors.white}>
        <HeaderWithBack
          buttonPress={() => navigation.goBack()}
          title={'Transaction History'}
        />
        <View style={{flex: 1}}>
          {showTransactionHistory === true && (
            <View style={styles.outStandingContainer}>
              <Text style={styles.balanceText}>Outstanding Balance</Text>
              <Price amount={details.Amount} fontSize={fontsSizes.twentyFour} />
              <Br mVertical={16} />
            </View>
          )}
          <View style={styles.transactionContainer}>
            {transactionHistory?.data.length > 0 && (
              <Text style={styles.olderTransactions}>Recent Transaction</Text>
            )}
            <FlatList
              data={transactionHistory?.data}
              ListFooterComponent={<View style={{height: 50}} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              ListEmptyComponent={
                <View style={styles.noTransactions}>
                  <Image
                    style={styles.noTransactionImage}
                    source={NO_TRANSACTIONS}
                  />
                  <Text style={styles.noTransactionText}>
                    No transaction yet!
                  </Text>
                </View>
              }
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => fetchData()}
                />
              }
              renderItem={({item, index}) => (
                <View key={index} style={styles.transactionCard}>
                  <View>
                    <Text style={styles.paymentType}>Amount Received</Text>
                    <Text style={styles.paymentTime}>
                      {transactionDateFormat(item.time)}
                    </Text>
                  </View>
                  <Text style={styles.amount}>₹{item.amount}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </SafeArea>
      {error && (
        <View style={styles.errorContainer}>
          <NetworkError
            isPadding={0}
            error={error}
            reducer={getTransactionHistory}
            token={details?.token}
            reducerSec={undefined}
            reducerThird={undefined}
          />
        </View>
      )}
      {loadingState && (
        <View style={styles.loaderMainView}>
          <AnimatedLoader />
        </View>
      )}
    </>
  );
};

export default TransactionHistory;
