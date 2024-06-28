import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scaledValue} from '~utils/styles.common';

const LoadingCard = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item width={'100%'}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="flex-start"
          marginLeft={20}
          width={'100%'}>
          <SkeletonPlaceholder.Item
            marginTop={16}
            width={scaledValue(143)}
            borderRadius={16}
            marginRight={20}
            height={scaledValue(184)}
          />
          <SkeletonPlaceholder.Item
            marginTop={16}
            width={scaledValue(143)}
            borderRadius={16}
            marginRight={20}
            height={scaledValue(184)}
          />
          <SkeletonPlaceholder.Item
            marginTop={16}
            width={scaledValue(143)}
            borderRadius={16}
            marginRight={20}
            height={scaledValue(184)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default LoadingCard;
