/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RoutesName} from '~constants/routes';
import History from '~screens/history/history';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {scaledValue, winHeight} from '~utils/styles.common';
import HomeEmpty from '~screens/homeEmpty';
import Categories from '~screens/categories/categories';
import Accounts from '~screens/accounts/accounts';
import {Platform} from 'react-native';
import HomeScreen from '~screens/homeScreen';
const HomeTabs = () => {
  const Tab = createBottomTabNavigator();

  type customIprops = {
    route: string;
    focused: boolean;
  };
  const CustomBar: React.FC<customIprops> = props => {
    let filePath;
    switch (props.route) {
      case RoutesName.HOME:
        filePath = require('../assets/home.json');
        break;
      case RoutesName.CATEGORIES:
        filePath = require('../assets/categories.json');
        break;
      case RoutesName.HISTORY:
        filePath = require('../assets/history.json');
        break;
      case RoutesName.ACCOUNTS:
        filePath = require('../assets/user.json');
        break;
      default:
        filePath = require('../assets/home.json');
    }
    return (
      <AnimatedLottieView
        style={{
          width: scaledValue(25),
          height: scaledValue(25),
        }}
        autoSize={true}
        resizeMode={'contain'}
        source={filePath}
        autoPlay={props.focused}
        loop={false}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          minHeight: winHeight > 700 ? (Platform.OS === 'ios' ? 90 : 70) : 70,
          backgroundColor: '#fff',
          // backgroundColor: 'red',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarIcon: ({focused}) => {
          return <CustomBar focused={focused} route={route.name} />;
        },
      })}>
      <Tab.Screen name={RoutesName.HOME} component={HomeScreen} />
      <Tab.Screen name={RoutesName.CATEGORIES} component={Categories} />
      <Tab.Screen name={RoutesName.HISTORY} component={History} />
      <Tab.Screen name={RoutesName.ACCOUNTS} component={Accounts} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
