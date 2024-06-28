/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  GestureResponderEvent,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ARROW_RIGHT} from '~assets';
import {scaledValue, fontFamily, colors} from '~utils/styles.common';
import Price from '~components/price/price';
import Br from '~components/br/br';
import NewItemCard from '~components/Card/newItemCard/newCard';
import {getDate} from '~components/getTimeinSec';
import {
  getHistoryByMonths,
  handleCardState,
} from '~state/slices/orderHistoryMonthlyAmount';
import {getOrderHistory} from '~state/slices/orderHistory/orderHistorySlice';
import {useAppSelector} from '~state/store';
import {getUserDetails} from '~state/slices/signup/signupSlice';
import {useDispatch} from 'react-redux';

type IcardProps = {
  handler: ((event: GestureResponderEvent) => void) | null | undefined;
  item: Iitem;
  loading: boolean;
  isOpen: boolean;
};

export type Iitem = {
  monthlyAmount: number;
  orderMothId: string;
  year: number;
  isOpen: boolean;
};
// type NewCardProps = {
//   name: string;
//   price: string;
//   createdTime: string;
//   orderId: string;
//   isDeleted: boolean;
//   itemId: string;
//   payStatus: string;
//   category: string;
//   isReverted: number;
// };
const PaidCardOpen: React.FC<IcardProps> = props => {
  const details = useAppSelector(getUserDetails);
  const dispatch = useDispatch<any>();
  const refreshing = false;
  const heightFirst = useRef(new Animated.Value(0)).current;
  const [data, setData] = useState([]);
  const history = useAppSelector(getOrderHistory);
  const loadingData = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  useEffect(() => {
    var date = getDate({
      monthId: props.item.orderMothId,
      year: props.item.year,
    });
    setData(history[date]);
  }, [history]);

  const renderItem = ({item, index}: any) => (
    <NewItemCard
      key={index}
      index={index}
      item={item}
      loadingState={props.loading}
    />
  );
  useEffect(() => {
    if (props.item.isOpen === true) {
      Animated.timing(heightFirst, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();

      Animated.timing(heightFirst, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
    if (props.item.isOpen === false) {
      Animated.timing(heightFirst, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();

      Animated.timing(heightFirst, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [handleCardState]);

  return (
    <View style={styles.container}>
      <Pressable
        hitSlop={{top: 20, bottom: 20, left: 5, right: 5}}
        onPress={props.handler}>
        <View style={styles.paidCard}>
          <Text style={styles.date}>
            {getDate({monthId: props.item.orderMothId, year: props.item.year})}
          </Text>
          <View style={styles.amountView}>
            <Price amount={props.item.monthlyAmount} fontSize={20} />
            <Animated.Image
              style={[
                styles.rightArrow,
                props.item.isOpen === true
                  ? {
                      transform: [
                        {
                          rotate: heightFirst.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['90deg', '0deg'],
                          }),
                        },
                      ],
                    }
                  : {
                      transform: [
                        {
                          rotate: heightFirst.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '90deg'],
                          }),
                        },
                      ],
                    },
              ]}
              source={ARROW_RIGHT}
            />
          </View>
        </View>
      </Pressable>
      {props.item.isOpen && (
        <View>
          <Br mVertical={16} />
          <FlatList
            initialNumToRender={20}
            updateCellsBatchingPeriod={50}
            maxToRenderPerBatch={10}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  dispatch(getHistoryByMonths(details?.token));
                }}
              />
            }
            windowSize={21}
            removeClippedSubviews={true}
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            data={props.loading === true ? loadingData : data}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
};

export default PaidCardOpen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.orderHistoryBlue,
    padding: 22,
    marginBottom: scaledValue(18),
    borderRadius: 20,
  },
  paidCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    color: '#23212E',
    fontSize: scaledValue(14),
    fontFamily: fontFamily.prompt500,
  },
  paidView: {
    marginTop: scaledValue(18),
  },

  amountView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightArrow: {
    width: scaledValue(25),
    height: scaledValue(15),
    resizeMode: 'contain',
  },
});
