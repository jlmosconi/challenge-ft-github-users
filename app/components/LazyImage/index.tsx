import {type FC, Fragment, useEffect, useState} from 'react';
import {useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import type {LazyImageProps} from './types';
import {ImageWrapper, Loader, StyledImage, Wrapper} from './styled';

const LazyImage: FC<LazyImageProps> = ({source, containerStyle, resizeMode = FastImage.resizeMode.cover, fallback}) => {
  const opacity = useSharedValue(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (source?.uri) {
      setError(false);
      setLoading(false);
    }
  }, [source?.uri]);

  const fadeIn = () => {
    opacity.value = withTiming(1, {duration: 300});
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const onLoadStart = () => {
    setLoading(true);
  };

  const onImageLoad = () => {
    fadeIn();
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <Wrapper style={containerStyle}>
      {loading && <Loader />}

      {!error && source.uri && (
        <ImageWrapper style={animatedStyle}>
          <StyledImage
            source={{
              uri: source.uri,
              priority: FastImage.priority.normal,
            }}
            resizeMode={resizeMode}
            onLoadStart={onLoadStart}
            onLoadEnd={onImageLoad}
            onError={onError}
          />
        </ImageWrapper>
      )}

      {(!source.uri || source.uri === '' || (!loading && error)) && <Fragment>{fallback}</Fragment>}
    </Wrapper>
  );
};

export default LazyImage;
