import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import {colors} from '~utils/styles.common';

const RenderFooter = () => {
  return (
    <View style={{height: 160, alignItems: 'center'}}>
      <ActivityIndicator
        size={'large'}
        color={colors.green}
        style={{marginTop: 15}}
      />
    </View>
  );
};

export default RenderFooter;
