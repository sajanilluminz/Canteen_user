import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {USER_PROFILE_FILLER, WAVE} from '~assets';
import Date from '~components/date';
import {scaledValue, fontFamily} from '~utils/styles.common';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {getUserSecondaryImage} from '~state/slices/signup/signupSlice';
type IUserHeaderProps = {
  name: string;
  image: string;
  profileClickHandler: () => void;
};

const UserHeader: React.FC<IUserHeaderProps> = ({
  name,
  image,
  profileClickHandler,
}) => {
  const secondaryImage = useSelector(getUserSecondaryImage);
  return (
    <View style={styles.userProfileOld}>
      <LinearGradient
        colors={['#C7EBE5', '#074217']}
        useAngle={true}
        angle={150}
        style={styles.userImagePlaceholder}>
        <Pressable onPress={profileClickHandler}>
          <FastImage
            style={styles.userImage}
            defaultSource={USER_PROFILE_FILLER}
            source={{
              uri: image ?? secondaryImage,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
          />
        </Pressable>
      </LinearGradient>
      <View style={styles.userDetials}>
        <View style={styles.details}>
          <Text style={styles.userName}>Hey {name}</Text>
          <Image style={styles.wave} source={WAVE} />
        </View>
        <Date />
      </View>
    </View>
  );
};

export default memo(UserHeader);

const styles = StyleSheet.create({
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: 'contain',
  },
  userProfileOld: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImagePlaceholder: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: 'rgba(253, 252, 253, 1)',
    fontFamily: fontFamily.prompt700,
    fontSize: scaledValue(16),
    letterSpacing: -0.5,
  },
  userDetials: {
    marginLeft: scaledValue(11),
  },
  wave: {
    width: 16,
    height: 16,
    marginLeft: 5,
  },
});
