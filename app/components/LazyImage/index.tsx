import {type FC, Fragment, useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import type {LazyImageProps} from './types';
import {AnimatedImage, Loader, Wrapper} from './styled';

const LazyImage: FC<LazyImageProps> = ({source, containerStyle, resizeMode, fallback}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (source?.uri) {
      setError(false);
      setLoading(false);
      opacity.setValue(0);
    }
  }, [source?.uri, opacity]);

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const onLoadStart = () => {
    setLoading(true);
  };

  const onImageLoad = () => {
    if (loading) {
      fadeIn();
    }
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  console.log('loading', loading, 'error', error, 'source', source);

  return (
    <Wrapper {...containerStyle}>
      {loading && <Loader />}

      {!error && source.uri && (
        <AnimatedImage
          source={source}
          style={{opacity}}
          resizeMode={resizeMode}
          onLoadStart={onLoadStart}
          onLoad={onImageLoad}
          onError={onError}
        />
      )}

      {(!source.uri || source.uri === '' || (!loading && error)) && <Fragment>{fallback}</Fragment>}
    </Wrapper>
  );
};

export default LazyImage;
