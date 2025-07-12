import {type FC} from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {type DefaultTheme, useTheme} from 'styled-components/native';
import SpacingBox from '@components/SpacingBox';
import {Block} from '@components/Users/Item/styled';
import {CenterContent, Container} from './styled';

const AVATAR_SIZE = 4;

const Skeleton: FC<{theme: DefaultTheme}> = ({theme}) => (
  <Block>
    <SpacingBox>
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
    <CenterContent>
      <ContentLoader
        width={theme.size(theme.spacing(15))}
        height={theme.size(theme.spacing(2))}
        backgroundColor={theme.colors.grey.light}
        foregroundColor={theme.colors.grey.medium}>
        <Rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
      </ContentLoader>
    </CenterContent>
  </Block>
);

const SkeletonList: FC<{elementsToDisplay?: number}> = ({elementsToDisplay = 1}) => {
  const theme = useTheme();
  return (
    <Container mt={elementsToDisplay === 1 ? 1 : 0}>
      {[...Array(elementsToDisplay)].map((_, index) => (
        <Skeleton key={index} theme={theme} />
      ))}
    </Container>
  );
};

export default SkeletonList;
