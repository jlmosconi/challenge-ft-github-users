import {type FC} from 'react';
import {useTheme} from 'styled-components/native';
import {useLanguageState} from '@hooks/useLanguageState';
import {Overline, TypographyText, Weight} from '@components/Text/TypographyText';
import SpecificSizeIcon from '@components/Icon/SpecificSize';
import {IconName} from '@components/Icon/icons';
import {FilterContainer} from './styled';

interface ListFilterProps {
  onFilterPress?: () => void;
}

const ListFilter: FC<ListFilterProps> = ({onFilterPress}) => {
  const theme = useTheme();
  const {t} = useLanguageState();
  return (
    <FilterContainer onPress={onFilterPress}>
      <TypographyText type={Overline} weight={Weight.SEMI_BOLD}>
        {t('favorites.filter.title')}
      </TypographyText>
      <SpecificSizeIcon name={IconName.ArrowRight} size={16} color={theme.colors.textPrimary} />
    </FilterContainer>
  );
};
export default ListFilter;
