import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {scaledValue, colors, fontFamily} from '~utils/styles.common';
import {ITextInputProps} from '~components/types';
const TextInputFeild: React.FC<ITextInputProps> = props => {
  return (
    <View style={styles.emailAddressView}>
      <Text style={styles.inputHeaderText}>{props.inputHeading}</Text>
      <TextInput
        style={styles.emailAddressInput}
        autoFocus={props.autoFocusInput}
        maxLength={props.maxLength}
        keyboardType={props.type}
        placeholder={`${props.placeholder}`}
        placeholderTextColor={'rgba(201, 205, 203, 1)'}
        value={props.value}
        onChangeText={props.textChangeExecutor}
      />
    </View>
  );
};

export default TextInputFeild;

const styles = StyleSheet.create({
  emailAddressView: {
    justifyContent: 'flex-start',
    marginTop: scaledValue(27),
  },
  inputHeaderText: {
    marginBottom: 6,
    color: colors.textInputHeader,
    fontFamily: fontFamily.prompt500,
  },
  emailAddressInput: {
    fontSize: scaledValue(16),
    paddingVertical: scaledValue(18),
    color: colors.black,
    fontFamily: fontFamily.prompt400,
    borderColor: colors.inputGrey,
    borderWidth: 1,
    borderRadius: 18,
    paddingLeft: 15.25,
  },
});
