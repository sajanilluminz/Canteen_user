import {
  FlatList,
  Image,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import {
  colors,
  fontFamily,
  fontsSizes,
  scaledValue,
} from '~utils/styles.common';
import {CROSS, INPUT_ICON} from '~assets';
import {IproductObj} from '~state/slices/commonTypes';
import SearchCard from '~components/productCard/searchCard';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {touchSlope} from '~utils/appUtils';
import {Marker} from 'react-native-svg';
import {Float} from 'react-native/Libraries/Types/CodegenTypes';
import moment from 'moment';

type ISearchInputProps = {
  inputRef: React.LegacyRef<TextInput>;
  onFocus?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  value: string | undefined;
  flatlistRef: React.LegacyRef<FlatList>;
  onTextChange?: ((text: string) => void) | undefined;
  searchButtonHandler?: () => void;
  searchData: IproductObj[];
  loading?: boolean;
  crossButtonHandler: () => void;

  showCross: boolean;
  animationV: SharedValue<Float>;
  // flatlistAnimatedStyles: StyleProp<
  //   Animated.AnimateStyle<StyleProp<ViewStyle>>
  // >;
};

const SearchBar: React.FC<ISearchInputProps> = ({
  inputRef,
  onFocus,
  searchButtonHandler,
  // flatlistAnimatedStyles,

  showCross,
  flatlistRef,
  value,
  crossButtonHandler,
  searchData,
  onTextChange,
  animationV,
}) => {
  const [date, setDate] = useState(moment(new Date()));
  let heightSearchList = scaledValue(210);

  const flatlistAnimatedStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(animationV.value, [1, 0], [0, heightSearchList]),
    };
  });

  const animationCrose = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animationV.value, [0, 1], [1, 0]),
    };
  });

  const animationSearch = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animationV.value, [0, 1], [0, 1]),
    };
  });

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      return (
        <Pressable key={index}>
          <SearchCard
            item={item}
            backgroundColor={colors.cardGrey}
            quantity={item.quantity}
          />
        </Pressable>
      );
    },
    [],
  );
  const renderItemSeparator = useCallback(() => {
    return <View style={styles.itemSeperator} />;
  }, []);

  return (
    <View style={styles.inputContainer}>
      <View style={[styles.inputBefore]}>
        <TextInput
          keyboardType="default"
          ref={inputRef}
          // autoFocus={true}
          onSubmitEditing={keyPress => {
            console.log('kl');
            inputRef?.current?.blur();
          }}
          onChangeText={onTextChange}
          blurOnSubmit={false}
          onFocus={onFocus}
          value={value}
          placeholderTextColor={'rgba(201, 209, 203, 1)'}
          maxLength={20}
          style={styles.textInput}
          placeholder="Search for food items..."
        />
        <TouchableOpacity
          style={styles.crossContainer}
          hitSlop={touchSlope}
          onPress={tap}>
          <Animated.Image
            style={[styles.cross, animationCrose]}
            source={CROSS}
          />
          <Animated.Image
            style={[styles.inputIcon, animationSearch]}
            source={INPUT_ICON}
          />
        </TouchableOpacity>
      </View>
      <Animated.View style={flatlistAnimatedStyles}>
        <FlatList
          ListHeaderComponent={() => <View style={{width: 20}} />}
          ListFooterComponent={() => <View style={{width: 20}} />}
          data={searchData}
          keyboardShouldPersistTaps={'always'}
          showsHorizontalScrollIndicator={false}
          ref={flatlistRef}
          maxToRenderPerBatch={5}
          ListEmptyComponent={
            <View style={styles.noSuchItem}>
              <Text style={styles.emptyText}>No result found</Text>
            </View>
          }
          ItemSeparatorComponent={renderItemSeparator}
          contentContainerStyle={styles.contentContainerStyle}
          horizontal
          keyExtractor={(item, index) => `${index}${item.itemId}`}
          renderItem={renderItem}
        />
      </Animated.View>
    </View>
  );

  function tap() {
    let d = moment(new Date());
    const duration = moment.duration(d.diff(date)).milliseconds();
    if (duration < 400) {
      return;
    }
    console.log('animationCrose : ', duration);
    setDate(d);
    showCross ? crossButtonHandler?.() : searchButtonHandler?.();
  }
};

export default memo(SearchBar);

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colors.white,
    borderRadius: 18,
    zIndex: 1,
    marginTop: scaledValue(20),
    flexDirection: 'column',
    overflow: 'hidden',
  },
  textInput: {
    flex: 1,
    fontFamily: fontFamily.prompt400,
    color: '#042F1F',
    fontSize: fontsSizes.eighteen,
    minHeight: 50,
  },

  inputBefore: {
    paddingVertical: Platform.OS === 'android' ? 4 : 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 5,
  },
  contentContainerStyle: {
    paddingTop: 40,
    flexGrow: 1,
  },
  itemSeperator: {
    width: 18,
  },
  // flatlistContainerStyle: {
  //   // marginHorizontal: 20,
  //   // marginBottom: 20,
  // },
  noSuchItem: {
    flex: 1,
    // borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#042F1F',
    marginBottom: 40,
  },
  cross: {
    width: scaledValue(15),
    height: scaledValue(15),
    resizeMode: 'contain',
    position: 'absolute',

    // backgroundColor: 'red',
  },
  inputIcon: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: scaledValue(45),
    height: scaledValue(45),
    position: 'absolute',
  },
  crossContainer: {
    width: scaledValue(45),
    height: scaledValue(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
