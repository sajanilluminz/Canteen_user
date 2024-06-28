import {
  DeviceEventEmitter,
  NativeAppEventEmitter,
  Platform,
} from 'react-native';
import _BackgroundTimer from 'react-native-background-timer';

const EventEmitter = Platform.select({
  ios: () => NativeAppEventEmitter,
  android: () => DeviceEventEmitter,
})();

class BackgroundTimer {
  static setInterval(callback) {
    _BackgroundTimer.start();
    this.backgroundListener = EventEmitter.addListener(
      'backgroundTimer',
      () => {
        this.backgroundTimer = _BackgroundTimer.setInterval(callback, 1000);
      },
    );
    return this.backgroundListener;
  }

  static clearInterval(timer) {
    _BackgroundTimer.stop();

    if (this.backgroundTimer) {
      _BackgroundTimer.clearInterval(this.backgroundTimer);
    }
    if (timer) {
      timer.remove();
    }
  }
}

export default BackgroundTimer;
