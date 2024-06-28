import {Dimensions} from 'react-native';
export const winHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;
const scaleFactor = windowWidth / 375;
const scaleHeight = winHeight / 812;
export const scaledValue = (value = 0) => value * scaleFactor;
export const scaledHeightValue = (value = 0) => value * scaleHeight;

export const dim = {
  _0px: scaledValue(0),
  _1px: scaledValue(1),
  _2px: scaledValue(2),
  _3px: scaledValue(3),
  _4px: scaledValue(4),
  _5px: scaledValue(5),
  _6px: scaledValue(6),
  _7px: scaledValue(7),
  _8px: scaledValue(8),
  _10px: scaledValue(10),
  _12px: scaledValue(12),
  _14px: scaledValue(14),
  _16px: scaledValue(16),
  _18px: scaledValue(18),
  _20px: scaledValue(20),
  _22px: scaledValue(22),
  _24px: scaledValue(24),
  _26px: scaledValue(26),
  _28px: scaledValue(28),
  _30px: scaledValue(30),
  _32px: scaledValue(32),
  _34px: scaledValue(34),
  _36px: scaledValue(36),
  _38px: scaledValue(38),
  _40px: scaledValue(40),
  _42px: scaledValue(42),
  _44px: scaledValue(44),
  _46px: scaledValue(46),
  _48px: scaledValue(48),
  _50px: scaledValue(50),
  _52px: scaledValue(52),
  _54px: scaledValue(54),
  _56px: scaledValue(56),
  _58px: scaledValue(58),
  _60px: scaledValue(60),
  _62px: scaledValue(62),
  _64px: scaledValue(64),
  _66px: scaledValue(66),
  _68px: scaledValue(68),
  _70px: scaledValue(70),
  _72px: scaledValue(72),
  _74px: scaledValue(74),
  _76px: scaledValue(76),
  _78px: scaledValue(78),
  _80px: scaledValue(80),
  _82px: scaledValue(82),
  _scale: function _scale(value: number | undefined) {
    return scaledValue(value);
  },
  _scaleHeight: function _scaleHeight(value: number | undefined) {
    return scaledHeightValue(value);
  },
};

export const colors = {
  white: '#fff',
  cream: 'rgba(252, 250, 241, 1)',
  black: 'rgba(11, 31, 40, 1)',
  grey: 'rgba(104, 130, 121, 1)',
  whiteText: 'rgba(255, 255, 255, 1)',
  green: '#35A77A',
  blue: '#021708',
  darkGreen: '#042F1F',
  inputGrey: 'rgba(234, 235, 236, 1)',
  dateBlue: 'rgba(189, 224, 241, 1)',
  placeholderWhite: 'rgba(201, 205, 203, 1)',
  textInputHeader: 'rgba(136, 140, 139, 1)',
  transparent: '00FFFFFF',
  counterBlue: '#0B1F28',
  cardGrey: 'rgba(242, 246, 245, 1)',
  notePurple: '#5E5C66',
  orderHistoryBlue: '#F2F6F5',
  cardBlue: 'rgba(226, 240, 235, 1)',
  timer: 'rgba(97, 118, 111, 1)',
  blackGrey: 'rgba(65, 71, 69, 1)',
  red: 'rgba(210, 56, 56, 1)',
  borderGrey: 'rgba(255, 255, 255, 1)',
  accountGrey: 'rgba(237, 241, 239, 1)',
  amountTopayGrey: 'rgba(11, 31, 40, 0.46)',
  wooBrown: '#414745',
  subTitle: '#8D8B93',
};

export const fontsSizes = {
  Header: scaledValue(84),
  Heading: scaledValue(34),
  decription: scaledValue(16),
  twelve: scaledValue(12),
  eleven: scaledValue(11),
  ten: scaledValue(10),
  eighteen: scaledValue(18),
  twenty: scaledValue(20),
  fourteen: scaledValue(14),
  thirty: scaledValue(30),
  fifteen: scaledValue(15),
  twentyFour: scaledValue(24),
  twentyEight: scaledValue(28),
  sixteen: scaledValue(16),
};

export const fontFamily = {
  prompt700: 'prompt-Bold',
  prompt600: 'Prompt-SemiBold',
  prompt500: 'Prompt-Medium',
  prompt400: 'Prompt-Regular',
};
