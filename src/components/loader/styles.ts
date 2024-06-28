import {StyleSheet} from 'react-native';
import {scaledValue} from '~utils/styles.common';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 100,
    justifyContent: 'center',
  },
  loadingIcon: {
    width: scaledValue(250),
    height: scaledValue(250),
  },
  loader: {
    width: scaledValue(300),
    height: scaledValue(300),
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: scaledValue(22),
    marginTop: scaledValue(40),
    color: '#fff',
  },
});
