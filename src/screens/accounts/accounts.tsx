import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './account.styles';
import {
  ACCOUTNS_ARROW as ACCOUNTS_ARROW,
  LOGOUT_ICON,
  PRIVACY_ICON,
  SUGGESTED_ICON,
  TRANSACTION_ICON,
  USER_PROFILE_FILLER,
} from '~assets';
import Br from '~components/br/br';
import {ScrollView} from 'react-native-gesture-handler';
import SafeArea from '~components/SafeArea/safeArea';
import Header from '~components/header/header';
import {RoutesName} from '~constants/routes';
import {useNavigation} from '@react-navigation/native';
import {colors, fontsSizes} from '~utils/styles.common';
import {useAppSelector} from '~state/store';
import {
  getUserDetails,
  getUserSecondaryImage,
} from '~state/slices/signup/signupSlice';
import {useDispatch, useSelector} from 'react-redux';
import LogoutModal from '~components/LogoutMoadal';
import axios from 'axios';
import {logOutUrl} from '~constants/baseurl';
import AnimatedLoader from '~components/animatedLoader';
import Price from '~components/price/price';
import {useToast} from 'react-native-toast-notifications';
import FastImage from 'react-native-fast-image';
import {useNetInfo} from '@react-native-community/netinfo';
import {getTransactionHistory} from '~state/slices/transactions/transactionSlice';
import exportObj from '~state/store';
const Accounts = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const [logoutModalState, setLogoutModalState] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState(false);
  const details = useAppSelector(getUserDetails);
  const secondaryImage = useSelector(getUserSecondaryImage);
  const isInternetReachable = useNetInfo();
  const toast = useToast();
  var refreshing = false;
  const logOutHandler = async () => {
    if (isInternetReachable.isInternetReachable) {
      try {
        setLogoutModalState(false);
        setLoadingState(true);
        const res = await axios.get(logOutUrl, {
          headers: {Authorization: `Bearer ${details.token}`},
        });
        exportObj.store.dispatch({type: 'RESET'});
        navigation.replace(RoutesName.GET_STARTED);
        setLoadingState(false);
        return res.data;
      } catch (error: any) {
        setLoadingState(false);
        if (error?.response) {
          toast.show(`${error?.response?.data?.message}`, {type: 'error'});
        } else {
          toast.show(`${error.message}`, {type: 'error'});
        }
        toast.hideAll();
      }
    } else {
      setLoadingState(false);
      toast.show('No internet', {
        type: 'error',
      });
      toast.hideAll();
    }
  };

  const privacyPolicyHandler = () => {
    if (isInternetReachable.isInternetReachable) {
      navigation.navigate(RoutesName.PRIVACY_POLiCY);
    } else {
      toast.show('No internet', {
        type: 'error',
      });
      toast.hideAll();
    }
  };

  return (
    <>
      <SafeArea background={colors.white}>
        <StatusBar barStyle={'dark-content'} />
        <Header title={'Account'} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => dispatch(getTransactionHistory(details?.token))}
            />
          }
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          style={styles.scrollViewContainer}>
          <View style={styles.userProfile}>
            <FastImage
              style={styles.userImage}
              defaultSource={USER_PROFILE_FILLER}
              source={{
                uri: details.photo ?? secondaryImage,
                cache: FastImage.cacheControl.immutable,
              }}
            />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{details.name}</Text>
              <Text style={styles.userEmail}>{details.email}</Text>
            </View>
          </View>
          <Br mVertical={21} />
          <View style={styles.amountDetails}>
            <Text style={styles.amountText}>Amount to pay</Text>
            <Price amount={details?.Amount} fontSize={fontsSizes.twenty} />
          </View>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(RoutesName.TRANSACTION_HISTORY)
              }>
              <View style={styles.singleOption}>
                <View style={styles.singleOptionLeft}>
                  <Image
                    style={styles.singleOptionImage}
                    source={TRANSACTION_ICON}
                  />
                  <Text style={styles.singleOptionText}>
                    Transaction History
                  </Text>
                </View>
                <Image style={styles.arrowRight} source={ACCOUNTS_ARROW} />
              </View>
            </TouchableOpacity>
            {/* <Br mVertical={16} />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(RoutesName.SUGGESTED_PRODUCTS)
              }>
              <View style={styles.singleOption}>
                <View style={styles.singleOptionLeft}>
                  <Image
                    style={styles.singleOptionImage}
                    source={SUGGESTED_ICON}
                  />
                  <Text style={styles.singleOptionText}>Suggest Product</Text>
                </View>
                <Image style={styles.arrowRight} source={ACCOUNTS_ARROW} />
              </View>
            </TouchableOpacity> */}
            <Br mVertical={16} />
            <TouchableOpacity onPress={privacyPolicyHandler}>
              <View style={styles.singleOption}>
                <View style={styles.singleOptionLeft}>
                  <Image
                    style={styles.singleOptionImage}
                    source={PRIVACY_ICON}
                  />
                  <Text style={styles.singleOptionText}>Privacy Policy</Text>
                </View>
                <Image style={styles.arrowRight} source={ACCOUNTS_ARROW} />
              </View>
            </TouchableOpacity>
            <Br mVertical={16} />
            <TouchableOpacity onPress={() => setLogoutModalState(true)}>
              <View style={styles.singleOption}>
                <View style={styles.singleOptionLeft}>
                  <Image
                    style={styles.singleOptionImage}
                    source={LOGOUT_ICON}
                  />
                  <Text style={styles.singleOptionText}>Logout</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeArea>
      <LogoutModal
        visible={logoutModalState}
        onCancel={() => setLogoutModalState(false)}
        onLogout={() => logOutHandler()}
      />
      {loadingState && <AnimatedLoader />}
    </>
  );
};

export default Accounts;
