import {GestureResponderEvent} from 'react-native';

export interface LogOutProps {
  visible: boolean;
  onCancel: (event: GestureResponderEvent) => void;
  onLogout: (event: GestureResponderEvent) => void;
}
