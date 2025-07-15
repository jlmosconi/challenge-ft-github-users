import Animated from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import type {ContainerStyle} from './types';

export const Wrapper = styled(Animated.View)<ContainerStyle>`
  position: relative;
  background-color: ${({theme, backgroundColor}) => backgroundColor || theme.colors.grey.medium};
  width: ${({theme, width}) => (width ? theme.size(width) + 'px' : '100%')};
  height: ${({theme, height}) => (height ? theme.size(height) + 'px' : '100%')};
  align-items: center;
  justify-content: center;
  border-radius: ${({theme, borderRadius}) => (borderRadius ? theme.size(borderRadius) : 0)}px;
  overflow: hidden;
`;

export const Loader = styled(ActivityIndicator).attrs(({theme}) => ({
  size: 'small',
  color: theme.colors.grey.medium,
}))`
  position: absolute;
`;

export const ImageWrapper = styled(Animated.View)`
  width: 100%;
  height: 100%;
`;

export const StyledImage = styled(FastImage)`
  height: 100%;
  width: 100%;
`;
