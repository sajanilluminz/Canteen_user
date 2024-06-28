type ToastType = import('react-native-toast-notifications').ToastType;
declare module '*.tff';
declare module '́*.png';
declare module '*.m4v';

declare global {
  const toast: ToastType;
}

declare var toast: ToastType;
