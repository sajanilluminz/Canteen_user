import {StyleSheet} from 'react-native';
import {
  colors,
  fontFamily,
  fontsSizes,
  scaledValue,
} from '~utils/styles.common';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  outStandingContainer: {
    marginTop: scaledValue(20),
  },
  balanceText: {
    color: colors.red,
    fontSize: scaledValue(14),
    fontFamily: fontFamily.prompt600,
  },
  olderTransactions: {
    marginBottom: 25,
    color: colors.grey,
    fontSize: scaledValue(18),
    fontFamily: fontFamily.prompt600,
  },
  transactionContainer: {
    flex: 1,
  },
  date: {
    color: 'rgba(35, 33, 46, 1)',
    fontFamily: fontFamily.prompt700,
    fontSize: scaledValue(14),
  },
  transactionCard: {
    marginBottom: scaledValue(33),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentType: {
    color: 'rgba(35, 33, 46, 1)',
    fontSize: scaledValue(16),
    fontFamily: fontFamily.prompt500,
  },
  paymentTime: {
    color: 'rgba(133, 151, 145, 1)',
    fontFamily: fontFamily.prompt500,
    fontSize: scaledValue(14),
  },
  amount: {
    fontFamily: fontFamily.prompt500,
    fontSize: scaledValue(16),
    color: colors.green,
  },
  noTransactions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTransactionImage: {
    width: scaledValue(215),
    height: scaledValue(229),
    resizeMode: 'contain',
  },
  noTransactionText: {
    color: colors.darkGreen,
    fontSize: fontsSizes.twentyFour,
    fontFamily: fontFamily.prompt700,
    marginBottom: scaledValue(50),
  },
  errorContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  loaderMainView: {
    position: 'absolute',
    width: '120%',
    alignSelf: 'center',
    height: '120%',
    backgroundColor: '#fff',
  },
});
