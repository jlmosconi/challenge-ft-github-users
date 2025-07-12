import {type FC} from 'react';
import type {HeaderTitleProps} from './types';
import {HeaderTitleContainer, Title} from './styled';

const HeaderTitle: FC<HeaderTitleProps> = ({title, leftElement, color, testID = 'pageTitle'}) => {
  return (
    <HeaderTitleContainer testID={testID}>
      {leftElement}
      <Title color={color} numberOfLines={1}>
        {title}
      </Title>
    </HeaderTitleContainer>
  );
};
export default HeaderTitle;
