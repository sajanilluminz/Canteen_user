// import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import SafeArea from '~components/SafeArea/safeArea';
import WebView from 'react-native-webview';
import {colors} from '~utils/styles.common';
import AnimatedLoader from '~components/animatedLoader';

const PrivacyPolicy = () => {
  const [showLoader, setLoaderState] = useState<any>(true);
  const wait = () => {
    setTimeout(() => {
      setLoaderState(false);
    }, 2000);
  };

  return (
    <SafeArea background={colors.white}>
      <WebView
        onLayout={() => wait()}
        source={{uri: 'https://www.illuminz.com/privacy'}}
      />
      {showLoader && <AnimatedLoader />}
    </SafeArea>
  );
};

export default PrivacyPolicy;

// const styles = StyleSheet.create({});
