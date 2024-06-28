import {StyleSheet} from 'react-native';
import {
  colors,
  fontsSizes,
  fontFamily,
  scaledValue,
} from '~utils/styles.common';

export const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    backgroundColor: '#0B1F28',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  blurView: {
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },

  link: {
    color: colors.green,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#F1F5F4',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    fontSize: fontsSizes.fourteen,
    fontFamily: fontFamily.prompt500,
  },
  flex: {
    flex: 1,
  },
  btn: {
    height: 36,
    marginTop: 10,
    width: 112,
  },
  btnInner: {
    padding: 10,
  },
  priceStyles: {
    color: colors.black,
    fontSize: fontsSizes.fourteen,
    marginRight: 4,
    fontFamily: fontFamily.prompt500,
  },
  cartTop: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  cartImage: {
    width: 49,
    height: 49,
  },
  padding: {
    padding: 20,
    backgroundColor: '#F1F5F4',
  },
  crossIcon: {
    backgroundColor: 'red',
  },
  flexBox: {
    marginRight: -10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bin: {
    marginRight: 20,
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  shadow: {
    width: '100%',
    height: 1,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    elevation: 1,
    shadowOpacity: 1,
  },
  arrowView: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
    top: 25,
    left: '50%',
  },
  midContainer: {flex: 1, backgroundColor: '#F2F6F5'},

  heading: {
    fontFamily: fontFamily.prompt700,
    fontSize: scaledValue(30),
    letterSpacing: -0.975,
    marginLeft: 20,
    marginTop: 20,
    color: colors.darkGreen,
  },
  itemSeparator: {
    width: '100%',
    height: 1,
    marginVertical: 20,
    backgroundColor: 'rgba(11, 31, 40, 0.10)',
  },
  flatlistStyles: {
    marginBottom: 6,
  },
  contentStyles: {
    paddingHorizontal: 22,
    marginTop: 36,
    paddingBottom: 40,
  },
});
