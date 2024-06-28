/* eslint-disable react-hooks/exhaustive-deps */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DELETE, DUMY_IMG, NEW_ICON, REPEAT} from '~assets';
import {
  scaledValue,
  fontFamily,
  colors,
  fontsSizes,
} from '~utils/styles.common';
import Price from '~components/price/price';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetails} from '~state/slices/signup/signupSlice';
import {getTimeInsec} from '~components/getTimeinSec';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useToast} from 'react-native-toast-notifications';
import {dayWithoutYear} from '~screens/homeScreen/views/getTime';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AnimatedLoader from '~components/animatedLoader';
import {placeOrder} from '~adaptors/apiCalls';
import {revertOrder} from '~adaptors/revertApi';
import {RoutesName} from '~constants/routes';

interface cardProps {
  item: NewCardprops;
  loadingState: boolean;
  index: number;
}

type NewCardprops = {
  name: string;
  price: number;
  image: string | undefined;
  createdTime: string;
  orderId: string;
  itemId: string;
  isActive: boolean;
  isDeleted: boolean;
  category: string;
  isReverted: number;
};

const NewItemCard: React.FC<cardProps> = props => {
  const navigation = useNavigation<any>();
  const [showLoading, setShowLoader] = useState<boolean>(false);
  const [seconds, setSeconds] = React.useState<number>(0);
  const toast = useToast();
  var index = props.index;
  const details = useSelector(getUserDetails);
  const dispatch = useDispatch<any>();
  var name = props.item.name;
  var price = props.item.price;
  var categroy = props.item.category;
  var image = props.item.image;
  var isReverted = props.item.isReverted;
  var createdTime = props.item.createdTime;
  let minutes = 2;
  const secondsToHms = (d: any) => {
    d = Number(d);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    let val = 0;
    var mDisplay = m > 0 ? `${m}:` : `${0}:`;

    var sDisplay = s > 0 ? (s >= 10 ? `${s}` : `${val}${s}`) : `${val}${val}`;

    return mDisplay + sDisplay;
  };

  useEffect(() => {
    let timeRemainingInSeconds = getTimeInsec(createdTime, minutes);
    setSeconds(timeRemainingInSeconds);
    var timer: any = null;
    if (timeRemainingInSeconds > 0) {
      timer = setInterval(() => {
        setSeconds(secs => {
          if (secs <= 0) {
            clearInterval(timer);
            return 0;
          }
          return secs - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, []);

  if (props.loadingState) {
    return (
      <View
        style={{
          marginVertical: scaledValue(10),
          flex: 1,
        }}>
        <SkeletonPlaceholder shimmerWidth={200} speed={1500}>
          <SkeletonPlaceholder.Item style={{width: '100%', borderRadius: 18}}>
            <View style={styles.newItemCardViewLoading} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    );
  } else {
    if (seconds > 0 && isReverted === 0) {
      return (
        <View style={styles.newItemCardView}>
          <View style={styles.newItemCardLeftView}>
            <View>
              <FastImage
                source={
                  image
                    ? {
                        uri: image,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.immutable,
                      }
                    : DUMY_IMG
                }
                style={styles.mainImage}
                resizeMode={FastImage.resizeMode.contain}
              />

              <Image style={styles.newTag} source={NEW_ICON} />
            </View>
            <View style={styles.quantityDeatailsView}>
              <Text style={styles.categroyText}>{categroy}</Text>
              <Text numberOfLines={1} style={styles.productHeading}>
                {name}
              </Text>
              <Text style={styles.categroyText}>
                {dayWithoutYear(createdTime)}
              </Text>
            </View>
          </View>
          <View style={styles.newItemRightView}>
            <View style={styles.priceAndTimeContainer}>
              <Price fontSize={20} amount={price} />
            </View>
            <View style={styles.repeatView}>
              <TouchableOpacity
                onPress={() =>
                  revertOrder({
                    data: props.item,
                    navigation: navigation,
                    setLoadingState: setShowLoader,
                    dispatch: dispatch,
                    token: details?.token,
                    index: index,
                    toast: toast,
                    nextRoute: RoutesName.HISTORY,
                  })
                }
                style={{paddingLeft: 20}}>
                <Image style={styles.binNew} source={DELETE} />
              </TouchableOpacity>
              <View style={styles.timeContainer}>
                <Text numberOfLines={1} style={styles.timerText}>
                  {secondsToHms(seconds)}
                </Text>
                <Text style={styles.min}>min</Text>
              </View>
            </View>
          </View>
          {showLoading && <AnimatedLoader />}
        </View>
      );
    } else {
      return (
        <View style={styles.newItemCardView}>
          <View style={styles.newItemCardLeftView}>
            <FastImage
              source={
                image
                  ? {
                      uri: image,
                      priority: FastImage.priority.high,
                      cache: FastImage.cacheControl.immutable,
                    }
                  : DUMY_IMG
              }
              style={styles.mainImage}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.quantityDeatailsView}>
              <Text style={styles.categroyText}>{categroy}</Text>
              <Text numberOfLines={1} style={styles.productHeading}>
                {name}
              </Text>
              <Text style={styles.categroyText}>
                {dayWithoutYear(createdTime)}
              </Text>
            </View>
          </View>
          <View style={styles.newItemRightView}>
            <View style={styles.priceAndTimeContainer}>
              <Price fontSize={20} amount={price} />
            </View>
            {props.item.isDeleted ? (
              <View style={styles.repeatView}>
                <Text style={styles.notAvailableText}>Not Available</Text>
              </View>
            ) : (
              <View>
                {props.item.isActive ? (
                  <TouchableOpacity
                    onPress={() =>
                      placeOrder({
                        data: props.item,
                        token: details?.token,
                        navigation: navigation,
                        setLoadingState: setShowLoader,
                        dispatch: dispatch,
                        toast: toast,
                        routeName: RoutesName.HISTORY,
                      })
                    }
                    style={{paddingLeft: 20, paddingBottom: 10}}>
                    <View style={styles.repeatView}>
                      <FastImage style={styles.bin} source={REPEAT} />
                      <Text style={styles.repeatOrderText}>Repeat</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.repeatView}>
                    <Text style={styles.outOfStockText}>Out of stock</Text>
                  </View>
                )}
              </View>
            )}
          </View>
          {showLoading && <AnimatedLoader />}
        </View>
      );
    }
  }
};
export default NewItemCard;

const styles = StyleSheet.create({
  newItemCardView: {
    flexDirection: 'row',
    height: scaledValue(90),
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
  },
  newItemCardViewLoading: {
    flexDirection: 'row',
    height: scaledValue(70),
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
  },
  newItemCardLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainImage: {
    width: scaledValue(62),
    // backgroundColor: 'red',
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
  quantityDeatailsView: {
    marginLeft: scaledValue(15),
    justifyContent: 'center',
  },
  categroyText: {
    color: '#5E5C66',
    fontFamily: fontFamily.prompt400,
    fontSize: scaledValue(10),
  },
  productHeading: {
    fontFamily: fontFamily.prompt500,
    fontSize: scaledValue(14),
    width: scaledValue(120),
    color: '#042F1F',
  },
  quantityHeading: {
    fontFamily: fontFamily.prompt400,
    fontSize: scaledValue(12),
    color: '#5E5C66',
  },
  priceAndTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newItemRightView: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: scaledValue(12),
    marginRight: 11,
    fontFamily: fontFamily.prompt500,
    color: '#61766F',
  },
  timeNewCard: {
    fontSize: scaledValue(12),
    fontFamily: fontFamily.prompt500,
    color: '#61766F',
  },
  bin: {
    width: scaledValue(13.33),
    height: scaledValue(15),
    resizeMode: 'contain',
  },
  binNew: {
    width: scaledValue(20),
    height: scaledValue(20),
    marginRight: 5,
    resizeMode: 'contain',
  },
  repeatOrderText: {
    color: colors.green,
    fontFamily: fontFamily.prompt500,
    fontSize: scaledValue(12),
  },
  notAvailableText: {
    color: colors.red,
    fontFamily: fontFamily.prompt500,
    fontSize: scaledValue(12),
  },
  outOfStockText: {
    color: colors.red,
    fontFamily: fontFamily.prompt500,
    fontSize: scaledValue(12),
  },
  repeatView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    color: colors.timer,
    width: scaledValue(28),
    fontSize: fontsSizes.twelve,
    fontFamily: fontFamily.prompt500,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  min: {
    color: colors.timer,
    fontSize: fontsSizes.twelve,
    fontFamily: fontFamily.prompt500,
  },
});
