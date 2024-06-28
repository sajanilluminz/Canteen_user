import {StyleSheet} from 'react-native';
import {
  colors,
  fontFamily,
  fontsSizes,
  scaledValue,
  winHeight,
} from '~utils/styles.common';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  itemLineTop: {
    transform: [
      {
        rotate: '-15deg',
      },
    ],
  },
  item: {
    height: 188,
    resizeMode: 'contain',
    width: 134,
    marginRight: 13,
  },
  lineContainer: {
    flexDirection: 'row',
  },
  bottomContainer: {
    backgroundColor: colors.white,
    height: winHeight > 700 ? '35%' : '40%',
    paddingBottom: 10,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 30,
    },
    elevation: 10,
    shadowRadius: 5,
    shadowOpacity: 1,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  shadow: {width: '100%', height: '100%', alignSelf: 'center'},
  DiscoverText: {
    color: colors.black,
    fontFamily: fontFamily.prompt700,
    alignSelf: 'center',
    marginHorizontal: 20,
    fontSize: fontsSizes.Heading,
  },
  displayFlex: {
    flex: 1,
    marginTop: scaledValue(20),
    alignItems: 'center',
  },
  descriptionText: {
    color: colors.grey,
    letterSpacing: -0.5,
    fontSize: fontsSizes.sixteen,
    fontFamily: fontFamily.prompt400,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  loaderStyles: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
});
