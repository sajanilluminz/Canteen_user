import {Platform, StyleSheet} from 'react-native';
import {colors, fontFamily, scaledValue, winHeight} from '~utils/styles.common';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scrollViewStyles: {
    flex: 1,
  },
  midContainer: {
    flex: 1,
    zIndex: 1,
    paddingHorizontal: 20,
  },
  hungeryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  smile: {
    width: 20,
    height: 20,
    marginRight: 5,
    resizeMode: 'contain',
  },
  hungryText: {
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: scaledValue(20),
    fontFamily: fontFamily.prompt600,
  },
  question: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: scaledValue(32),
    fontFamily: fontFamily.prompt700,
    lineHeight: scaledValue(40),
  },
  contentContainer: {
    flexGrow: 1,
  },
  recentOrder: {
    overflow: 'hidden',
    marginTop: 35,
    borderTopLeftRadius: 39,
    shadowColor: '#000',
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderTopRightRadius: 39,
    paddingVertical: 20,
    alignSelf: 'center',
    backgroundColor: colors.white,
  },
  recentOrderHeading: {
    color: colors.darkGreen,
    fontFamily: fontFamily.prompt700,
    paddingVertical: winHeight > 700 ? 22 : 12,
    paddingHorizontal: 22,
    fontSize: scaledValue(18),
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  bottomSpacer: {
    height: 150,
  },
});
