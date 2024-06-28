import React from 'react';
import SplashScreen from '~screens/splashScreen/splashScreen';
import GetStartedNew from '~screens/getStratedNew/index';
import {RoutesName} from '~constants/routes';
import HomeTabs from './tabNavigator';
import Ordersucess from '~screens/orderSuccess';
import revertOrder from '~screens/revertorder/revertorder';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import CategoryProducts from '~screens/categories/subScreens/categroieProducts';
import AddSugested from '~screens/accounts/subScreens/addSugested/addSugested';
import SuggestedProducts from '~screens/accounts/subScreens/suggestedProducts/suggestedProducts';
import TransactionHistory from '~screens/accounts/subScreens/transactionHistory/transactionHistory';
import PrivacyPolicy from '~screens/accounts/subScreens/privacyPolocy';
import CheckOut from '~screens/cartFlow/checkout';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
const AuthNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name={RoutesName.SPLASH} component={SplashScreen} />
      <Stack.Screen
        name={RoutesName.HOME_TAB}
        options={{
          headerShown: false,
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
        component={HomeTabs}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
        name={RoutesName.CONFIRMATION}
        component={Ordersucess}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.BottomSheetAndroid,
        }}
        name={RoutesName.REVERT_ORDER}
        component={revertOrder}
      />
      <Stack.Screen name={RoutesName.GET_STARTED} component={GetStartedNew} />
      <Stack.Screen
        name={RoutesName.CATEGORIES_DETAILS}
        component={CategoryProducts}
      />
      <Stack.Screen
        name={RoutesName.TRANSACTION_HISTORY}
        component={TransactionHistory}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.DefaultTransition,
        }}
        name={RoutesName.SUGGESTED_PRODUCTS}
        component={SuggestedProducts}
      />
      <Stack.Screen
        component={AddSugested}
        options={{
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
        name={RoutesName.ADD_SUGESTED}
      />

      <Stack.Screen
        name={RoutesName.PRIVACY_POLiCY}
        component={PrivacyPolicy}
      />
      <Stack.Screen name={RoutesName.CHECKOUT} component={CheckOut} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
