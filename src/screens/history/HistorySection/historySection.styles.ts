import {StyleSheet} from 'react-native';
import {
  scaledValue,
  fontFamily,
  colors,
  fontsSizes,
} from '~utils/styles.common';

export const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },

  footor: {
    overflow: 'hidden',
    // backgroundColor: colors.orderHistoryBlue,
    // backgroundColor: 'red',
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 10,
    // padding: 12,
    // paddingTop: 26,
    height: 20,
    marginBottom: 18,
  },

  footorView: {
    position: 'absolute',
    backgroundColor: colors.orderHistoryBlue,
    width: '100%',
    height: 40,
    borderRadius: 20,
    top: -20,
  },

  header: {
    backgroundColor: colors.orderHistoryBlue,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    // padding: 12,
    paddingTop: 26,
  },

  headerTitle: {
    // left: 10,
    color: '#23212E',
    fontSize: fontsSizes.eighteen,
    fontFamily: fontFamily.prompt700,
    flex: 1,
  },
  headerPrice: {
    color: '#23212E',
    fontSize: fontsSizes.eighteen,
    fontFamily: fontFamily.prompt700,
  },

  iconArrowDown: {
    width: 24,
    height: 24,
  },
  ////

  unpaidContainer: {
    marginTop: scaledValue(28),
    marginBottom: scaledValue(20),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unpaidHeader: {
    color: 'rgba(100, 129, 117, 1)',
    fontSize: scaledValue(20),
    fontFamily: fontFamily.prompt500,
  },
  noRecentImage: {
    width: scaledValue(215),
    marginBottom: scaledValue(8),
    height: scaledValue(229),
    resizeMode: 'contain',
  },
  errorView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignSelf: 'center',
  },
  noRecent: {
    color: colors.darkGreen,
    fontSize: fontsSizes.twentyFour,
    fontFamily: fontFamily.prompt700,
  },
  noRecentText: {
    fontFamily: fontFamily.prompt500,
    fontSize: fontsSizes.sixteen,
    color: colors.darkGreen,
  },
  scrollViewContainer: {
    marginTop: scaledValue(20),
    marginBottom: scaledValue(30),
  },
  amountToPay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: scaledValue(30),
    alignItems: 'center',
  },
  noteText: {
    color: colors.black,
    fontSize: fontsSizes.eleven,
    fontFamily: fontFamily.prompt400,
  },
  noteStatement: {
    marginLeft: scaledValue(20),
    color: colors.notePurple,
    fontFamily: fontFamily.prompt400,
    fontSize: fontsSizes.eleven,
  },
  loadingCard: {
    padding: 40,
    marginBottom: scaledValue(18),
    borderRadius: 20,
  },
  // footer: {
  //   height: 150,
  // },
  cardContainer: {flex: 1, marginBottom: 30},

  separator: {
    width: '100%',
    marginBottom: 18,
    height: 1,
    backgroundColor: 'rgba(11, 31, 40, 0.10)',
  },
  divider: {
    height: 20,
  },
  sectionDivider: {
    height: 20,
  },
  dateLoading: {
    width: scaledValue(87),
    height: scaledValue(22),
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loadingContainerLeft: {flexDirection: 'row', alignItems: 'center'},
  contentLeft: {
    width: 62,
    height: 72,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
  },
  centerContainer: {
    marginLeft: 25,
  },
  lineTop: {
    width: 40,
    height: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 5,
  },
  lineCenter: {
    width: 50,
    height: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 5,
  },
  lineBottom: {
    width: 60,
    height: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
  },
  endContainer: {alignItems: 'flex-end'},
  endTop: {
    width: 24,
    height: 24,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
  },
  endBottom: {
    width: 98,
    height: 20,
    marginTop: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
  },
});
