import {ImageSourcePropType} from 'react-native';
import {
  LOGOUT_ICON,
  PRIVACY_ICON,
  SUGGESTED_ICON,
  TERMS_ICON,
  TRANSACTION_ICON,
} from '~assets';

type CompData = {
  image: ImageSourcePropType | undefined;
  name: string;
}[];

export const comp: CompData = [
  {
    image: TRANSACTION_ICON,
    name: 'Transaction History',
  },
  {
    image: SUGGESTED_ICON,
    name: 'Suggest Product',
  },
  {
    image: TERMS_ICON,
    name: 'Terms & Conditions',
  },
  {
    image: PRIVACY_ICON,
    name: 'Privacy Policy',
  },
  {
    image: LOGOUT_ICON,
    name: 'Logout',
  },
];
