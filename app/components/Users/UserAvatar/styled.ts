import LazyImage from '@components/LazyImage';
import SpacingBox from '@components/SpacingBox';
import styled from 'styled-components/native';

export const AvatarWrapper = styled.View<{size: number; backgroundColor?: string}>`
  overflow: hidden;
  height: ${({size, theme}) => `${theme.size(theme.spacing(size))}px`};
  width: ${({size, theme}) => `${theme.size(theme.spacing(size))}px`};
  border-radius: ${({size, theme}) => `${theme.size(theme.spacing(size) / 2)}px`};
  background-color: ${({backgroundColor}) => backgroundColor};
  align-items: center;
  justify-content: center;
`;

export const StyledImage = styled(LazyImage).attrs<{backgroundColor?: string}>(({}) => ({
  containerStyle: {
    backgroundColor: 'transparent',
  },
}))`
  width: 100%;
  height: 100%;
`;

export const ProfileDefault = styled(SpacingBox)`
  width: 100%;
  height: 100%;
`;
