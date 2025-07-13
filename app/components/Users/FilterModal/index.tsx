import {forwardRef, useMemo} from 'react';
import {useLanguageState} from '@hooks/useLanguageState';
import {useTheme} from 'styled-components/native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import type {SortOption} from '@store/slices/favorites/types';
import BottomModal from '@components/BottomModal';
import {TypographyText} from '@components/Text/TypographyText';
import SpecificSizeIcon from '@components/Icon/SpecificSize';
import {IconName} from '@components/Icon/icons';
import {Container, FilterContainer} from './styled';

interface BottomModalProps {
  filter: SortOption;
  onSortSelection: (option: SortOption) => void;
}

const FilterModal = forwardRef<BottomSheetModal, BottomModalProps>(({filter, onSortSelection}, ref) => {
  const theme = useTheme();
  const {t} = useLanguageState();

  const options: {label: string; value: SortOption}[] = useMemo(
    () => [
      {label: t('favorites.filter.options.name-asc'), value: 'name-asc'},
      {label: t('favorites.filter.options.name-desc'), value: 'name-desc'},
      {label: t('favorites.filter.options.id'), value: 'id'},
    ],
    [t],
  );

  return (
    <BottomModal ref={ref}>
      <Container>
        {options.map(option => {
          const isSelected = filter === option.value;

          return (
            <FilterContainer key={option.value} selected={isSelected} onPress={() => onSortSelection(option.value)}>
              <TypographyText>{option.label}</TypographyText>
              {isSelected && <SpecificSizeIcon name={IconName.Check} color={theme.colors.textPrimary} size={18} />}
            </FilterContainer>
          );
        })}
      </Container>
    </BottomModal>
  );
});

export default FilterModal;
