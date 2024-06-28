import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontsSizes, winHeight} from '~utils/styles.common';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bg_Image: {
    position: 'absolute',
    width: 300,
    top: '30%',
    alignSelf: 'center',
    height: 300,
    opacity: 0.3,
  },
  cardView: {
    flex: 1,
    marginTop: 10,
    width: '97%',
    alignSelf: 'center',
  },
  categoryContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemText: {
    fontSize: fontsSizes.twenty,
    color: colors.darkGreen,
    fontFamily: fontFamily.prompt600,
  },
  card: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.cardGrey,
    borderRadius: 16,
  },
  errorView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignSelf: 'center',
  },
  contentContainer: {justifyContent: 'space-between'},
  contentContainerStyles: {flexGrow: 1, paddingTop: 60},
  listSeparator: {
    height: 60,
  },
  footerContainer: {
    height: (winHeight * 15) / 100,
  },
});
