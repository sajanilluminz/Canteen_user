/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';
import {getTimeInsec} from '~components/getTimeinSec';

const useBackgroundTimer = ({
  createdAt,
}: {
  createdAt: string | null | undefined;
}) => {
  const [seconds, setSeconds] = useState<number>(0);
  const appState = useRef(AppState.currentState);
  let minutes = 2;

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/background/) && nextAppState === 'active') {
        console.log('mono...');
        let remainingSec = getTimeInsec(createdAt, minutes);
        setSeconds(remainingSec);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  });

  useEffect(() => {
    let timeRemainingInSeconds = getTimeInsec(createdAt, minutes);
    setSeconds(timeRemainingInSeconds);
    var timer: any = null;
    if (timeRemainingInSeconds > 0) {
      timer = setInterval(() => {
        setSeconds(secs => {
          if (secs <= 0) {
            clearInterval(timer);
            return 0;
          }
          return secs - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [createdAt]);

  return seconds;
};

export default useBackgroundTimer;
