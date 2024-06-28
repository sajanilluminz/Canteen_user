/* eslint-disable react-hooks/exhaustive-deps */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useMemo, useState} from 'react';
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

type IHistoryCardProps = {
  item: IRecentObj;
  index: number;
};

const HistoryCard: React.FC<IHistoryCardProps> = ({item, index}) => {
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
  if (seconds > 0) {
    return (
      <View style={styles.newItemCardView}>
        <View style={styles.newItemCardLeftView}>
          <View>
            <FastImage
              source={{
                uri: item.image,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.immutable,
              }}
              style={styles.mainImage}
              defaultSource={DUMY_IMG}
              resizeMode={FastImage.resizeMode.contain}
            />
            {seconds > 0 && <Image style={styles.newTag} source={NEW_ICON} />}
          </View>
          <View style={styles.quantityDetailsView}>
            <Text style={styles.categoryText}>{item.category}</Text>
            <Text numberOfLines={1} style={styles.productHeading}>
              {item.name}
            </Text>
            <Text
              style={styles.quantityText}>{`Quantity: ${item.quantity}`}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.timeContainer}>
            <Text numberOfLines={1} style={styles.timerText}>
              {secondsToHms(seconds)}
            </Text>
            <Text style={styles.min}>min</Text>
          </View>
          <View style={styles.binContainer}>
            <TouchableOpacity onPress={revertOrderHandler}>
              <Image style={styles.binNew} source={DELETE} />
            </TouchableOpacity>
            <Price amount={historyPrice} fontSize={fontsSizes.twenty} />
          </View>
        </View>
        {showLoader && <AnimatedLoader />}
      </View>
    );
  } else {
    return (
      <View style={styles.newItemCardView}>
        <View style={styles.newItemCardLeftView}>
          <View>
            <FastImage
              source={{
                uri: item.image,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.immutable,
              }}
              style={styles.mainImage}
              defaultSource={DUMY_IMG}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={styles.quantityDetailsView}>
            <Text style={styles.categoryText}>{item.category}</Text>
            <Text numberOfLines={1} style={styles.productHeading}>
              {item.name}
            </Text>
            <Text
              style={styles.quantityText}>{`Quantity: ${item.quantity}`}</Text>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <View style={styles.priceView}>
            <Price amount={historyPrice} fontSize={fontsSizes.twenty} />
            <TouchableOpacity
              onPress={() =>
                placeOrder({
                  data: item,
                  setLoadingState: setShowLoader,
                  dispatch: dispatch,
                  token: details?.token,
                  nextRoute: RoutesName.HISTORY,
                  navigation: navigation,
                  toast: toast,
                })
              }
              style={styles.repeatContainer}>
              <View style={styles.repeatView}>
                <FastImage style={styles.bin} source={REPEAT} />
                <Text style={styles.repeatOrderText}>Repeat Order</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {showLoader && <AnimatedLoader />}
      </View>
    );
  }
};

export default memo(HistoryCard);

const styles = StyleSheet.create({
  newItemCardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    alignItems: 'center',
  },
  newItemCardLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainImage: {
    width: scaledValue(62),
    height: scaledValue(72),
    position: 'relative',
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },
  newTag: {
    width: scaledValue(44),
    position: 'absolute',
    top: 0,
    right: -10,
    resizeMode: 'contain',
    height: scaledValue(22),
  },
  quantityText: {
    color: '#5E5C66',
    fontFamily: fontFamily.prompt400,
    fontSize: scaledValue(12),
  },
  productHeading: {
    fontFamily: fontFamily.prompt500,
    fontSize: scaledValue(14),
    width: scaledValue(120),
    color: '#042F1F',
  },
  categoryText: {
    fontFamily: fontFamily.prompt400,
    fontSize: scaledValue(10),
    color: '#5E5C66',
  },
  quantityDetailsView: {
    marginLeft: scaledValue(15),
    justifyContent: 'center',
  },
  timerText: {
    color: colors.timer,
    width: 28,
    fontSize: fontsSizes.twelve,
    fontFamily: fontFamily.prompt500,
  },
  rightContainer: {
    flexDirection: 'row',
    marginRight: 12,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  binNew: {
    width: scaledValue(24),
    height: scaledValue(24),
    marginBottom: 8,
    marginRight: 5,
    resizeMode: 'contain',
  },
  binContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  repeatContainer: {
    paddingLeft: 20,
    paddingBottom: 10,
  },
  repeatView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bin: {
    width: scaledValue(15),
    height: scaledValue(15),
    resizeMode: 'contain',
  },
  repeatOrderText: {
    color: colors.green,
    fontFamily: fontFamily.prompt500,
    marginLeft: 4,
    letterSpacing: -0.5,
    fontSize: scaledValue(12),
  },
  priceView: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  timeContainer: {
    flexDirection: 'row',
    marginRight: 12,
    alignItems: 'center',
  },
  min: {
    color: colors.timer,
    fontSize: fontsSizes.twelve,
    fontFamily: fontFamily.prompt500,
  },
});
