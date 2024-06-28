/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import SafeArea from '~components/SafeArea/safeArea';
import HeaderWithBack from '~components/headerWithBack/headerWithBack';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  Text,
  View,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import {BUTTON, DUMY_IMG, NO_ORDERS} from '~assets';
import Price from '~components/price/price';
import Greenbutton from '~components/greenbutton/greenbutton';
import {RoutesName} from '~constants/routes';
import {colors} from '~utils/styles.common';
import {useDispatch, useSelector} from 'react-redux';
import {
  currentPage,
  fetchSuggestedProducts,
  resetPageCount,
  suggestedLoadingState,
  totalPages,
  updateCurrentPage,
} from '~state/slices/suggestedSlice/suggestedSlice';
import {getUserDetails} from '~state/slices/signup/signupSlice';
import {useAppSelector} from '~state/store';
import AnimatedLoader from '~components/animatedLoader';
import NetworkError from '~components/error/errorScreen';
import SuggestionCard from './suggestionCard';
import RenderFooter from './components/footer';
const SuggestedProducts = () => {
  const navigation = useNavigation<any>();
  const details = useAppSelector(getUserDetails);
  const loading = useAppSelector(suggestedLoadingState);
  const totalAvailablePages = useAppSelector(totalPages);
  const currentPageInList = useAppSelector(currentPage);
  const [loadingState, setLoadingState] = useState(loading);
  const dispatch = useDispatch<any>();
  const [refreshing, setRefreshing] = React.useState(false);
  const [suggested, error] = useSelector((state: any) => [
    state.suggested.suggested,
    state.suggested.error,
  ]);

  const fetchSuggested = () => {
    dispatch(resetPageCount());
    dispatch(fetchSuggestedProducts({token: details?.token}));
  };
  const loadMoreData = () => {
    if (totalAvailablePages >= currentPageInList) {
      dispatch(updateCurrentPage(1));
      dispatch(
        fetchSuggestedProducts({
          token: details?.token,
          page: currentPageInList,
        }),
      );
    }
  };

  const fetchSuggestions = async () => {
    await dispatch(fetchSuggestedProducts({token: details?.token}));
    console.log('suggested products');
  };
  useEffect(() => {
    if (suggested === null) {
      fetchSuggestions();
    }
  }, [suggested]);

  return (
    <SafeArea background={colors.white}>
      <HeaderWithBack
        buttonPress={() => navigation.goBack()}
        title={'Suggest Product'}
      />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={
            <View style={styles.containerNoOrders}>
              <Image style={styles.noRecentImage} source={NO_ORDERS} />
              <Text style={styles.noRecent}>No suggestions yet!</Text>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchSuggested()}
            />
          }
          data={suggested}
          onEndReached={loadMoreData}
          ListFooterComponent={
            currentPageInList !== 1 && loading ? (
              <RenderFooter />
            ) : (
              <View style={{height: 200}} />
            )
          }
          renderItem={({item, index}) => (
            <SuggestionCard
              showHeader={item.showHeader}
              date={item.date}
              name={item.name}
              status={item.status}
              reason={item.reason}
              price={item.price}
            />
          )}
        />
        {!error && (
          <View style={styles.buttonContianer}>
            <View style={{width: '85%', alignSelf: 'center'}}>
              <Greenbutton
                buttonPress={() => navigation.navigate(RoutesName.ADD_SUGESTED)}
                buttonTitle={'Add Suggestion'}
              />
            </View>
          </View>
        )}
      </View>
      {error && (
        <View style={styles.errorView}>
          <NetworkError
            error={error}
            specialReducer={fetchSuggestedProducts}
            token={details?.token}
            reducerSec={undefined}
            reducerThird={undefined}
          />
        </View>
      )}
      {currentPageInList === 1 && loading && (
        <View style={styles.loaderMainView}>
          <AnimatedLoader />
        </View>
      )}
    </SafeArea>
  );
};

export default SuggestedProducts;
