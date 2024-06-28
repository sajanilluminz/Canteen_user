import {ImageSourcePropType} from 'react-native';
import {
  CAT_BEVERAGE,
  CAT_BISCUIT,
  CAT_CHOCOLATE,
  CAT_INSTANT,
  CAT_MUNCHIES,
} from '~assets';

export type ICategoriesDataProperties = {
  name: string;
  fullName: string;
  id: number;
  bg_Color: string;
  subImage: ImageSourcePropType;
};

export const categories: ICategoriesDataProperties[] = [
  {
    name: 'chocolate',
    fullName: '🍫 Chocolates',
    id: 1,
    bg_Color: '#F7EEE7',
    subImage: CAT_CHOCOLATE,
  },
  {
    name: 'Beverages',
    id: 2,
    fullName: '🥤 Beverages',
    bg_Color: '#F9F2E5',
    subImage: CAT_BEVERAGE,
  },
  {
    name: 'Instant Food',
    id: 3,
    fullName: '🍜 Instant Food',
    subImage: CAT_INSTANT,
    bg_Color: '#FCE8DE',
  },
  {
    name: 'Biscuits',
    fullName: '🍪 Biscuits',
    id: 4,
    bg_Color: '#FDF1D7',
    subImage: CAT_BISCUIT,
  },
  {
    name: 'Munchies',
    id: 5,
    bg_Color: '#FCF3EF',
    fullName: '🥡 Munchies',
    subImage: CAT_MUNCHIES,
  },
];
