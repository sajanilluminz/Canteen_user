/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  FlatList,
  StatusBar,
  Pressable,
  RefreshControl,
  Platform,
  ImageSourcePropType,
} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import {styles} from './categories.styles';
import {useNavigation} from '@react-navigation/native';
import {RoutesName} from '~constants/routes';
import SafeArea from '~components/SafeArea/safeArea';
import Header from '~components/header/header';
import {colors, winHeight} from '~utils/styles.common';
import {useDispatch, useSelector} from 'react-redux';
import NetworkError from '~components/error/errorScreen';
import {
  fetchCategories,
  getLoadingState,
} from '~state/slices/getCategroies/categroiesSlice';
import {useAppSelector} from '~state/store';
import {getUserDetails} from '~state/slices/signup/signupSlice';
import FastImage from 'react-native-fast-image';
import {CAT_CHOCOLATE, CAT_PLACEHOLDER} from '~assets';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CartWrapper from '~screens/cartFlow/cartWrapper';
import CategoryCard from './Views/categoryCard';
import {getProducts} from '~state/slices/allproducts/allProductsSlice';
import {ICategoriesData} from '~components/types';
import {ICategoriesDataProperties} from '~state/slices/getCategroies/categoresData';

const Categories = () => {
  const navigation = useNavigation<any>();
  const loadingState = useSelector(getLoadingState);
  const [refreshing, setRefreshing] = React.useState(false);
  const details = useAppSelector(getUserDetails);
  const [categories, error] = useSelector((state: any) => [
    state.categories.categories,
    state.categories.error,
  ]);

  const bottom = useMemo(
    () => (winHeight > 700 ? (Platform.OS === 'ios' ? 90 : 70) : 160),
    [],
  );

  const categoriesLoadingData = useMemo(() => [1, 2, 3, 4, 5], []);
  const dispatch = useDispatch<any>();

  const executor = (item: {
    name: string;
    bg_Color: string;
    fullName: string;
    subImage: ImageSourcePropType;
  }) => {
    navigation.push(RoutesName.CATEGORIES_DETAILS, {
      item,
    });
  };

  const renderFooterComponent = useCallback(() => {
    return <View style={styles.footer} />;
  }, []);

  useEffect(() => {
    dispatch(fetchCategories(details.token));
    dispatch(getProducts(details.token));
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(fetchCategories(details.token));
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderItem = React.useCallback(
    ({item, index}: {item: ICategoriesDataProperties; index: number}) => {
      return loadingState ? (
        <View style={index % 2 === 0 ? styles.marginCard : {}}>
          <SkeletonPlaceholder>
            <View style={styles.cardImage} />
          </SkeletonPlaceholder>
        </View>
      ) : (
        <View style={index % 2 === 0 ? styles.marginCard : {}}>
          <CategoryCard
            onTouch={() => executor(item)}
            name={item.fullName}
            color={item.bg_Color}
            image={item.subImage}
            key={item.id}
          />
        </View>
      );
    },
    [loadingState],
  );

  return (
    <CartWrapper bottom={bottom}>
      <SafeArea background={colors.white}>
        <StatusBar barStyle={'dark-content'} />
        <Header title="Categories" />
        <View style={[styles.categoriesView, {paddingBottom: bottom + 10}]}>
          <FlatList
            data={loadingState ? categoriesLoadingData : categories}
            numColumns={2}
            columnWrapperStyle={[styles.flatlistContainer]}
            refreshControl={
              <RefreshControl
                tintColor={colors.green}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            ListFooterComponent={renderFooterComponent}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
          />
        </View>

        {error && (
          <View style={styles.errorView}>
            <NetworkError
              error={error}
              loading={loadingState}
              token={details.token}
              reducer={fetchCategories}
            />
          </View>
        )}
      </SafeArea>
    </CartWrapper>
  );
};

export default Categories;
