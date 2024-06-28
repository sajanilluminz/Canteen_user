/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable dot-notation */
/* eslint-disable prettier/prettier */
import React, {useEffect, useRef} from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import AuthNavigator from '~navigation/AuthNavigator';
import {PersistGate} from 'redux-persist/integration/react';
import exportObj from './src/state/store';
import {Provider} from 'react-redux';
import {
  Alert,
  BackHandler,
  TouchableOpacity,
  AppState,
  LogBox,
  StyleSheet,
  Text,
  View,
  Linking,
  Platform,
} from 'react-native';
import {ToastProvider, useToast} from 'react-native-toast-notifications';
import {colors, fontFamily, fontsSizes} from '~utils/styles.common';
import axios from 'axios';

export const navigationRef = createNavigationContainerRef<any>();

const App = () => {
  type IToastProps = {
    message:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined;
  };

  const appState = useRef(AppState.currentState);
  const Toast = useToast();

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/)) {
        Platform.OS === 'android' && checkAppVersion();
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const checkAppVersion = async () => {
    try {
      const res = await axios.get(
        'http://54.176.169.179:3084/api/v1/version/getVersion?type=0&appVersion=2.0',
      );
      const response = await res?.data?.data?.responseVersion;
      if (response?.soft_update) {
        toast.show('new version available!', {
          type: 'versionUpdate',
          duration: 4000000,
        });
      } else if (response?.force_update) {
        Alert.alert('New version Available!', 'Please update to continue', [
          {
            text: 'Cancel',
            onPress: () => BackHandler.exitApp(),
            style: 'cancel',
          },
          {
            text: 'download',
            onPress: () =>
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.illuminz.canteen&hl=en_IN',
              ),
          },
        ]);
        return true;
      }
    } catch (error: any) {
      if (error?.response) {
        Toast.show(`${error?.response?.data?.message}`, {
          type: 'error',
        });
      } else {
        Toast.show(`${error.message}`, {
          type: 'error',
        });
      }
      Toast.hideAll();
      console.log(error);
    }
  };
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();
  const {persistor, store} = exportObj;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastProvider
          offsetTop={50}
          placement="top"
          duration={4000}
          renderType={{
            error: (toast: IToastProps) => (
              <View style={styles.errorModal}>
                <Text
                  style={{
                    fontFamily: fontFamily.prompt600,
                    fontSize: fontsSizes.fifteen,
                    color: colors.red,
                  }}>
                  {toast.message}
                </Text>
              </View>
            ),
            green: (toast: IToastProps) => (
              <View style={styles.successModal}>
                <Text
                  style={{
                    fontFamily: fontFamily.prompt600,
                    fontSize: fontsSizes.fifteen,
                    color: colors.green,
                  }}>
                  {toast.message}
                </Text>
              </View>
            ),
            versionUpdate: toast => (
              <View style={styles.versionModal}>
                <Text
                  style={{
                    fontFamily: fontFamily.prompt600,
                    fontSize: fontsSizes.eighteen,
                    color: colors.green,
                  }}>
                  {toast.message}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      'https://play.google.com/store/apps/details?id=com.illuminz.canteen&hl=en_IN',
                    );
                  }}>
                  <Text style={styles.downloadButton}>download</Text>
                </TouchableOpacity>
              </View>
            ),
          }}>
          <NavigationContainer ref={navigationRef}>
            <AuthNavigator />
          </NavigationContainer>
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.red,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  errorModal: {
    backgroundColor: colors.cream,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '90%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 8,
    borderLeftColor: colors.red,
    borderLeftWidth: 6,
  },
  successModal: {
    backgroundColor: colors.cream,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '90%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 8,
    borderLeftColor: colors.green,
    borderLeftWidth: 6,
  },
  versionModal: {
    backgroundColor: 'rgb(255, 255, 255)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '90%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 8,
    borderLeftColor: 'rgb(0, 200, 81)',
    borderLeftWidth: 6,
  },
  downloadButton: {
    color: 'rgb(0, 200, 81)',
    fontSize: fontsSizes.fifteen,
  },
});

// element.style {
//   background-color: rgb(255, 255, 255);
//   border-left-color: rgb(0, 200, 81);
//   border-left-width: 6px;
//   border-radius: 8px;
//   margin-top: 4px;
//   margin-bottom: 4px;
//   max-width: 85%;
