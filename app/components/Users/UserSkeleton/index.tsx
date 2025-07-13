import React, {type FC} from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import SpacingBox from '@components/SpacingBox';
import {useTheme} from 'styled-components/native';
import {BoxesContainer} from '@screens/User/styled';
import {CenterContent} from './styled';

const AVATAR_SIZE = 8;

const UserSkeleton: FC = () => {
  const theme = useTheme();
  return (
    <CenterContent>
      <SpacingBox mb={1}>
        {/* AVATAR */}
        <ContentLoader
          width={theme.size(theme.spacing(AVATAR_SIZE))}
          height={theme.size(theme.spacing(AVATAR_SIZE))}
          backgroundColor={theme.colors.grey.light}
          foregroundColor={theme.colors.grey.medium}>
          <Circle
            cx={theme.size(theme.spacing(AVATAR_SIZE / 2))}
            cy={theme.size(theme.spacing(AVATAR_SIZE / 2))}
            r={theme.size(theme.spacing(AVATAR_SIZE / 2))}
          />
        </ContentLoader>
      </SpacingBox>
      <SpacingBox mb={0.5}>
        {/* NAME */}
        <ContentLoader
          width={theme.size(theme.spacing(20))}
          height={theme.size(theme.spacing(3))}
          backgroundColor={theme.colors.grey.light}
          foregroundColor={theme.colors.grey.medium}>
          <Rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
        </ContentLoader>
      </SpacingBox>
      <SpacingBox mb={2}>
        <ContentLoader
          width={theme.size(theme.spacing(10))}
          height={theme.size(theme.spacing(2))}
          backgroundColor={theme.colors.grey.light}
          foregroundColor={theme.colors.grey.medium}>
          <Rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
        </ContentLoader>
      </SpacingBox>
      {/* BIO */}
      <SpacingBox mb={0.5}>
        <ContentLoader
          width={theme.size(theme.spacing(35))}
          height={theme.size(theme.spacing(2))}
          backgroundColor={theme.colors.grey.light}
          foregroundColor={theme.colors.grey.medium}>
          <Rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
        </ContentLoader>
      </SpacingBox>
      <SpacingBox mb={2}>
        <ContentLoader
          width={theme.size(theme.spacing(25))}
          height={theme.size(theme.spacing(2))}
          backgroundColor={theme.colors.grey.light}
          foregroundColor={theme.colors.grey.medium}>
          <Rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
        </ContentLoader>
      </SpacingBox>

      <SpacingBox mb={3}>
        <BoxesContainer>
          {new Array(3).fill(null).map((_, index) => (
            <ContentLoader
              key={index}
              width={theme.size(theme.spacing(12))}
              height={theme.size(theme.spacing(7))}
              backgroundColor={theme.colors.grey.light}
              foregroundColor={theme.colors.grey.medium}>
              <Rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
            </ContentLoader>
          ))}
        </BoxesContainer>
      </SpacingBox>

      <ContentLoader
        width={'100%'}
        height={theme.size(theme.spacing(15))}
        backgroundColor={theme.colors.grey.light}
        foregroundColor={theme.colors.grey.medium}>
        <Rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
      </ContentLoader>
    </CenterContent>
  );
};
export default UserSkeleton;
