import {type FC} from 'react';

import {FilterContainer} from './styled';
import {Overline, TypographyText, Weight} from '@components/Text/TypographyText';
import SpecificSizeIcon from '@components/Icon/SpecificSize';
import {IconName} from '@components/Icon/icons';
import {useTheme} from 'styled-components/native';

interface ListFilterProps {
  onFilterPress?: () => void;
}

const ListFilter: FC<ListFilterProps> = ({onFilterPress}) => {
  const theme = useTheme();
  return (
    <FilterContainer onPress={onFilterPress}>
      <TypographyText type={Overline} weight={Weight.SEMI_BOLD}>
        Ordenar por...
      </TypographyText>
      <SpecificSizeIcon name={IconName.ArrowRight} size={16} color={theme.colors.textPrimary} />
    </FilterContainer>
  );
};
export default ListFilter;
