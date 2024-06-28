import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import Price from '~components/price/price';
import Greenbutton from '~components/greenbutton/greenbutton';
import {DELETE, IC_ARROW_TOP} from '~assets';
import {styles} from './styles';
import CheckoutCard from './view/checkoutCard';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {IPlaceOrderObj} from '~state/slices/commonTypes';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {ActiveSlide} from '../cartWrapper/types';
import {winHeight} from '~utils/styles.common';

type ICartProps = {
  cartData: IPlaceOrderObj[];
  removeCartButton: () => void;
  cartTotal: number;
  placeOrderHandler: () => void;
};

const Cart: React.FC<ICartProps> = ({
  removeCartButton,
  cartTotal,
  cartData,
  placeOrderHandler,
}) => {
  const activeSlide = useSharedValue(ActiveSlide.None);
  const minHeight = 0;
  const compHeight = (winHeight * 60) / 100;
  const overlayMax = (winHeight * 40) / 100;
  const cartHeight = useSharedValue(minHeight);
  const itemSeparator = useCallback(() => {
    return <View style={styles.itemSeparator} />;
  }, []);

  const renderItem = useCallback(({item}: {item: IPlaceOrderObj}) => {
    return <CheckoutCard item={item} />;
  }, []);

  const animatedHeightStyle = useAnimatedStyle(() => {
    return {
      height: cartHeight.value,
    };
  });

  const animatedArrowStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(
            cartHeight.value,
            [minHeight, compHeight],
            [0, 180],
          )}deg`,
        },
      ],
    };
  });

  const animatedOverlayStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(
        cartHeight.value,
        [minHeight, compHeight],
        [0, overlayMax],
        Extrapolation.CLAMP,
      ),
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      if (cartHeight.value < 90) {
        activeSlide.value = ActiveSlide.Bottom;
      } else {
        activeSlide.value = ActiveSlide.Top;
      }
    },
    onActive: () => {
      if (activeSlide.value === ActiveSlide.Bottom) {
        cartHeight.value = withTiming(compHeight, {
          duration: 500,
        });
      } else {
        cartHeight.value = withTiming(minHeight, {
          duration: 500,
        });
      }
    },
  });

  function onTapEvent() {
    if (activeSlide.value === ActiveSlide.Bottom) {
      cartHeight.value = withTiming(compHeight, {
        duration: 500,
      });
    } else {
      cartHeight.value = withTiming(minHeight, {
        duration: 500,
      });
    }
  }

  return (
    <View>
      <Animated.View style={[styles.overlay, animatedOverlayStyles]} />
      <View>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View>
            <TouchableOpacity onPress={onTapEvent}>
              <View style={styles.header}>
                <Animated.Image
                  style={animatedArrowStyles}
                  source={IC_ARROW_TOP}
                />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
        <Animated.View style={[styles.midContainer, animatedHeightStyle]}>
          <Text style={styles.heading}>Checkout</Text>
          <FlatList
            data={cartData}
            maxToRenderPerBatch={5}
            style={styles.flatlistStyles}
            contentContainerStyle={styles.contentStyles}
            ItemSeparatorComponent={itemSeparator}
            keyExtractor={(item, index) => `${index}${item.name}`}
            renderItem={renderItem}
          />
        </Animated.View>
        <View style={styles.container}>
          <View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceStyles}>Total Price:</Text>
              <Price amount={cartTotal} fontSize={20} />
            </View>
          </View>
          <View style={styles.flexBox}>
            <TouchableOpacity onPress={removeCartButton}>
              <Image style={styles.bin} source={DELETE} />
            </TouchableOpacity>
            <Greenbutton
              radius={10}
              btnShadow={2}
              titleStyles={styles.btnText}
              btnInnerStyles={styles.btnInner}
              buttonOuterStyles={styles.btn}
              buttonPress={placeOrderHandler}
              buttonTitle={"I'm taking it"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(Cart);
