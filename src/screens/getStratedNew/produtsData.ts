import {ImageSourcePropType} from 'react-native';
import {
  LINE_DARRY,
  LINE_HID,
  LINE_KUL,
  LINE_LAYS,
  LINE_MEG,
  LINE_MUN,
  LINE_RAW,
  LINE_RED_LAYS,
  PUFF,
} from '~assets';

type IDisplayImage = {
  id: number;
  image: ImageSourcePropType;
};
export const productsData: IDisplayImage[] = [
  {
    id: 1,
    image: LINE_DARRY,
  },
  {
    id: 2,
    image: LINE_RED_LAYS,
  },
  {
    id: 3,
    image: LINE_HID,
  },
  {
    id: 4,
    image: LINE_KUL,
  },
  {
    id: 5,
    image: PUFF,
  },
  {
    id: 6,
    image: LINE_LAYS,
  },
  {
    id: 7,
    image: LINE_MEG,
  },
  {
    id: 8,
    image: LINE_MUN,
  },
  {
    id: 9,
    image: LINE_DARRY,
  },
  {
    id: 10,
    image: LINE_RAW,
  },
];
