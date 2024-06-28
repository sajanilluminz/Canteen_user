import {
  BEVERAGES,
  BUSCITS,
  CHOCOLATE_IMAGE,
  INSTANT_FOOD,
  MUNCHIES,
} from '~assets';
import {ICategoriesData} from '~components/types';

export const categoriesData: ICategoriesData[] = [
  {
    name: '🍫 Chocolates',
    image: CHOCOLATE_IMAGE,
  },
  {
    name: '🥤 Beverages',
    image: BEVERAGES,
  },
  {
    name: '🍜 Instant Food',
    image: INSTANT_FOOD,
  },
  {
    name: '🍪 Biscuits',
    image: BUSCITS,
  },
  {
    name: ' 🍜 Munchies',
    image: MUNCHIES,
  },
];
