import {StyleSheet} from 'react-native';
import {colors, fontFamily, scaledValue, winHeight} from '~utils/styles.common';

export const styles = StyleSheet.create({
  header: {
    color: colors.darkGreen,
    marginLeft: scaledValue(12),
    marginTop: scaledValue(15),
    fontSize: scaledValue(28),
    fontFamily: fontFamily.prompt700,
  },
  categoriesView: {
    marginTop: scaledValue(25),
    width: '100%',
    flex: 1,
    alignSelf: 'center',
  },
  cardImage: {
    resizeMode: 'contain',
    width: scaledValue(157),
    backgroundColor: '#F7EEE7',
    borderRadius: 28,
    height: scaledValue(178),
  },
  flatlistContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  marginCard: {
    marginTop: 20,
  },
  errorView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignSelf: 'center',
  },
  footer: {
    height: (winHeight * 13) / 100,
  },
});
