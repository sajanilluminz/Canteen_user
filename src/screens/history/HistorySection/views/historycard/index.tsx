/* eslint-disable react-hooks/exhaustive-deps */
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {
  colors,
  fontFamily,
  fontsSizes,
  scaledValue,
} from '~utils/styles.common';
import FastImage from 'react-native-fast-image';
import {DELETE, DUMY_IMG, NEW_ICON, REPEAT} from '~assets';
import Price from '~components/price/price';
import {IRecentObj} from '~state/slices/commonTypes';
import {useToast} from 'react-native-toast-notifications';
import {secondsToHms} from '~utils/appUtils';
import {revertOrder} from '~adaptors/revertApi';
import {RoutesName} from '~constants/routes';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetails} from '~state/slices/signup/signupSlice';
import {placeOrder} from '~adaptors/apiCalls';
import AnimatedLoader from '~components/animatedLoader';
import useBackgroundTimer from '~constants/hooks/bgTimer';
import {getDateTime} from '~components/getTimeinSec';

type IHistoryCardProps = {
  item: IRecentObj;
  index: number;
  isExpanded: boolean;
  isEnd: boolean;
};

type IDashLineProps = {};

const HistoryCard: React.FC<IHistoryCardProps> = ({item, index, isEnd}) => {
  const toast = useToast();
  const seconds = useBackgroundTimer({createdAt: item.createdAt});
  const details = useSelector(getUserDetails);
  const [showLoader, setShowLoader] = useState(false);

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  let historyPrice = useMemo(() => {
    if (item.price && item.quantity) {
      return item.price * item.quantity;
    } else {
      toast.show('Something went wrong');
    }
  }, [item.price, item.quantity]);

  let date = getDateTime(item.createdAt);
  let price = historyPrice; //`₹${historyPrice}`;
  let detail = item.name ?? 'Kitkat X 4';

  const revertOrderHandler = () => {
    if (item.price && item.itemId && item.orderId) {
      revertOrder({
        data: {
          price: item.price,
          itemId: item.itemId && item.itemId,
          orderId: item.orderId && item.orderId,
          quantity: item.quantity ?? 1,
        },
        navigation: navigation,
        setLoadingState: setShowLoader,
        dispatch: dispatch,
        token: details?.token,
        index: index,
        toast: toast,
        nextRoute: RoutesName.HISTORY,
      });
    } else {
      toast.show('Something went wrong');
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.containerWhite, {marginBottom: isEnd ? 0 : 8}]}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text style={styles.date}>{date}</Text>
          {/* <Text style={styles.price}>{price}</Text> */}
          <Price amount={price} fontSize={16} />
        </View>
        <DashedLine />

        <Text style={styles.detail}>{detail}</Text>
        {showLoader && <AnimatedLoader />}
      </View>
    </View>
  );
};

const DashedLine: React.FC<IDashLineProps> = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#0B1F281A',
        borderStyle: 'dashed',
        zIndex: 0,
        marginVertical: 8,
      }}>
      <View
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          height: 1,
          backgroundColor: 'white',
          zIndex: 1,
        }}
      />
    </View>
  );
};

export default memo(HistoryCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // borderRadius: 20,
    alignItems: 'center',
    backgroundColor: colors.orderHistoryBlue,
  },

  containerWhite: {
    flex: 1,
    marginHorizontal: 12,
    padding: 10,
    marginVertical: 8,
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: 'white',
  },

  date: {
    flex: 1,
    fontFamily: fontFamily.prompt500,
    fontSize: fontsSizes.twelve,
    color: colors.darkGreen,
  },
  price: {
    fontFamily: fontFamily.prompt600,
    fontSize: fontsSizes.sixteen,
    color: colors.notePurple,
  },
  detail: {
    fontFamily: fontFamily.prompt500,
    fontSize: fontsSizes.fourteen,
    color: colors.subTitle,
  },
});
