/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text, TouchableOpacity, View, Animated} from 'react-native';
import React, {memo, useMemo, useState} from 'react';
import {
  scaledValue,
  fontFamily,
  colors,
  fontsSizes,
} from '~utils/styles.common';
import {Iprops} from '../../../../components/productCard/card.types';
import Price from '~components/price/price';
import {DUMY_IMG} from '~assets';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetails} from '~state/slices/signup/signupSlice';
import {useNavigation} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useToast} from 'react-native-toast-notifications';
import FastImage from 'react-native-fast-image';
import AnimatedLoader from '~components/animatedLoader';
import {placeOrder} from '~adaptors/apiCalls';
import {IproductObj} from '~state/slices/commonTypes';
import {RoutesName} from '~constants/routes';
import {revertOrder} from '~adaptors/revertApi';
import {secondsToHms} from '~utils/appUtils';
import useBackgroundTimer from '~constants/hooks/bgTimer';

const RecentCell: React.FC<Iprops> = props => {
  let interpolateRotating = props.interpolateRotating;
  let name = props.item.name;
  const index = props.index;
  const toast = useToast();
  let loading = props.loading;
  let createdTime = props.item?.createdAt;
  const AnimatedImage = Animated.createAnimatedComponent(FastImage);
  let image = props.item.image;
  let category = props.item.category;
  let price = props.item.price;
  let quantity = props.item.quantity;
  const details = useSelector(getUserDetails);
  const seconds = useBackgroundTimer({createdAt: createdTime});
  const [showLoading, setShowLoader] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  let productPrice = useMemo(() => {
    if (price && quantity) {
      return price * quantity;
    } else {
      toast.show('Something went wrong');
    }
  }, [price, quantity]);

  var data: IproductObj = {
    itemId: props.item.itemId,
    isActive: props.item.isActive,
    isDeleted: props.item.isDeleted,
    category: props.item.category,
    quantity: props.item.quantity,
    image: props.item.image,
    name: props.item.name,
    price: props.item.price,
  };

  const revertOrderHandler = () => {
    if (props.item.price && props.item.itemId && props.item.orderId) {
      revertOrder({
        data: {
          price: props.item.price,
          itemId: props.item.itemId && props.item.itemId,
          orderId: props.item.orderId && props.item.orderId,
          quantity: props.item.quantity ?? 1,
        },
        navigation: navigation,
        setLoadingState: setShowLoader,
        dispatch: dispatch,
        token: details?.token,
        index: index,
        toast: toast,
        nextRoute: RoutesName.HOME,
      });
    } else {
      toast.show('Something went wrong');
    }
  };

  if (loading) {
    return (
      <View style={styles.card}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item width={'100%'}>
            <SkeletonPlaceholder.Item style={styles.flex} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    );
  } else {
    if (seconds > 0) {
      return (
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <AnimatedImage
              defaultSource={DUMY_IMG}
              resizeMode={FastImage.resizeMode.contain}
              style={[
                styles.cardImage,
                {
                  transform: [{rotate: interpolateRotating}],
                },
              ]}
              source={{
                uri: image,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.immutable,
              }}
            />
          </View>
          <View style={styles.cardDetails}>
            <Text style={styles.categoryName}>{category}</Text>
            <Text numberOfLines={1} style={styles.productName}>
              {name}
            </Text>
            <View style={styles.timerContainer}>
              <Price amount={productPrice} fontSize={20} />
              <View style={styles.timeContainer}>
                <Text numberOfLines={1} style={styles.timerText}>
                  {secondsToHms(seconds)}
                </Text>

                <Text style={styles.min}>min</Text>
              </View>
            </View>

            <Text
              style={[
                styles.productName,
                {alignSelf: 'flex-end'},
              ]}>{`Quantity : ${props.item.quantity}`}</Text>
          </View>
          <View
            style={[
              styles.bottomContainer,
              {width: `${100 - (seconds / 120) * 100}%`},
            ]}
          />
          <TouchableOpacity onPress={revertOrderHandler}>
            <View style={styles.cardButtonViewMostRecent}>
              <Text style={styles.buttonHeadingCancel}>Put it back</Text>
            </View>
          </TouchableOpacity>
          {showLoading && <AnimatedLoader />}
        </View>
      );
    } else {
      return (
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <AnimatedImage
              defaultSource={DUMY_IMG}
              resizeMode={FastImage.resizeMode.contain}
              style={[
                styles.cardImage,
                {
                  transform: [{rotate: interpolateRotating}],
                },
              ]}
              source={{
                uri: image,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.immutable,
              }}
            />
          </View>
          <View style={styles.cardDetails}>
            <Text style={styles.categoryName}>{category}</Text>
            <Text numberOfLines={1} style={styles.productName}>
              {name}
            </Text>
            <Text
              style={[
                styles.productName,
                {alignSelf: 'flex-end'},
              ]}>{`Quantity : ${props.item.quantity}`}</Text>
            <Price amount={productPrice ?? 0} fontSize={20} />
          </View>
          {props.item.isDeleted ? (
            <View style={styles.cardButtonViewDeleted}>
              <Text style={styles.buttonHeadingDeleted}>Not Available</Text>
            </View>
          ) : props.item.isActive ? (
            <TouchableOpacity
              onPress={() =>
                placeOrder({
                  data: data,
                  setLoadingState: setShowLoader,
                  dispatch: dispatch,
                  token: details?.token,
                  navigation: navigation,
                  toast: toast,
                })
              }
              style={{flex: 1, justifyContent: 'flex-end'}}>
              <View style={styles.cardButtonView}>
                <Text style={styles.buttonHeading}>I'm taking it</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.cardButtonViewNotActive}>
              <Text style={styles.buttonHeadingNotAvailable}>Out of stock</Text>
            </View>
          )}
          {showLoading && <AnimatedLoader />}
        </View>
      );
    }
  }
};

export default memo(RecentCell);

const styles = StyleSheet.create({
  flex: {flex: 1},
  card: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.cardGrey,
    borderRadius: 16,
  },
  cardImage: {
    width: scaledValue(118),
    alignSelf: 'center',
    position: 'absolute',
    top: -40,
    height: scaledValue(95),
    resizeMode: 'contain',
  },
  imageContainer: {
    marginBottom: scaledValue(40),
  },
  cardDetails: {
    flex: 1,
    marginRight: scaledValue(15),
    marginVertical: scaledValue(25),
    paddingLeft: 14,
  },
  categoryName: {
    fontFamily: fontFamily.prompt400,
    color: '#5E5C66',
    fontSize: scaledValue(10),
  },
  productName: {
    fontFamily: fontFamily.prompt500,
    color: '#042F1F',
    fontSize: scaledValue(14),
  },
  cardButtonView: {
    backgroundColor: '#0B1F28',
    height: scaledValue(36),
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHeading: {
    fontSize: scaledValue(14),
    fontFamily: fontFamily.prompt600,
    color: '#fff',
  },
  cardButtonViewMostRecent: {
    // marginTop: 20,
    backgroundColor: colors.cardBlue,
    height: scaledValue(36),
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    position: 'relative',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHeadingCancel: {
    fontSize: scaledValue(14),
    fontFamily: fontFamily.prompt600,
    color: colors.darkGreen,
  },
  timerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    height: -1,
    backgroundColor: 'red',
  },
  timerText: {
    color: colors.timer,
    width: scaledValue(28),
    fontSize: fontsSizes.twelve,
    fontFamily: fontFamily.prompt500,
  },
  timeContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  min: {
    color: colors.timer,
    fontSize: fontsSizes.twelve,
    fontFamily: fontFamily.prompt500,
  },
  cardButtonViewNotActive: {
    backgroundColor: '#FBF6F2',
    height: scaledValue(36),
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHeadingNotAvailable: {
    fontSize: scaledValue(14),
    fontFamily: fontFamily.prompt600,
    color: colors.blue,
  },
  cardButtonViewDeleted: {
    backgroundColor: colors.cardGrey,
    height: scaledValue(36),
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHeadingDeleted: {
    fontSize: scaledValue(14),
    fontFamily: fontFamily.prompt600,
    color: colors.red,
  },
  bottomContainer: {
    backgroundColor: colors.darkGreen,
    height: 2,
  },
});
