import {
  GestureResponderEvent,
  ImageSourcePropType,
  KeyboardTypeOptions,
} from 'react-native';

export interface ITextInputProps {
  inputHeading: string;
  placeholder: string;
  value: string;
  maxLength?: number | undefined;
  autoFocusInput?: boolean;
  textChangeExecutor?: any;
  type?: KeyboardTypeOptions | undefined;
}

export interface IGreenButtonProps {
  buttonPress?: (event: GestureResponderEvent) => void;
  buttonTitle: string;
}

export interface ITabbarIcon {
  source: ImageSourcePropType | undefined;
  focus: boolean;
  route: string;
}

export interface ICategoriesData {
  name: string;
  image: ImageSourcePropType | undefined;
}
