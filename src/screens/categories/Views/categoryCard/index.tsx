import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {memo} from 'react';
import {colors, fontFamily, scaledValue} from '~utils/styles.common';
import {SharedElement} from 'react-navigation-shared-element';

type ICategoryCardProps = {
  onTouch: () => void;
  name: string;
  color: string;
  key: number;
  image: ImageSourcePropType;
};

const CategoryCard: React.FC<ICategoryCardProps> = ({
  name,
  color,
  image,
  key,
  onTouch,
}) => {
  return (
    // <SharedElement id={`item.${key}.color`}>
    <View style={[styles.container, {backgroundColor: color}]}>
      <Pressable style={styles.flex} onPress={onTouch}>
        {/* <SharedElement style={StyleSheet.absoluteFill} id={`item.${key}.name`}> */}
        <Text style={styles.name}>{name}</Text>
        {/* </SharedElement> */}
        <SharedElement style={StyleSheet.absoluteFill} id={'image'}>
          <Image style={styles.image} source={image} />
        </SharedElement>
      </Pressable>
    </View>
    // </SharedElement>
  );
};

export default memo(CategoryCard);

const styles = StyleSheet.create({
  container: {
    width: scaledValue(157),
    height: 178,
    paddingHorizontal: 14,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 30,
    zIndex: 1,
  },
  name: {
    color: colors.darkGreen,
    fontFamily: fontFamily.prompt700,
    fontSize: scaledValue(16),
  },
  image: {
    width: scaledValue(150),
    height: 150,

    resizeMode: 'contain',
    position: 'absolute',
    bottom: -25,
    right: -25,
  },
  flex: {
    flex: 1,
  },
});
