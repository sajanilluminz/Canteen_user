import React, {useRef, useEffect} from 'react';
import {Animated, StyleSheet} from 'react-native';

type SkeltonPro = {
  width: number | string;
  height: number | string;
  radius: number;
};

const Skelton: React.FC<SkeltonPro> = ({width, height, radius}) => {
  const opacity = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.5,
          useNativeDriver: true,
          duration: 500,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          opacity: opacity.current,
          width: width,
          height: height,
          borderRadius: radius,
        },
        styles.skelton,
      ]}
    />
  );
};
const styles = StyleSheet.create({
  skelton: {
    backgroundColor: 'hsl(200, 20%, 95%)',
    borderRadius: 7,
  },
});
export default Skelton;
