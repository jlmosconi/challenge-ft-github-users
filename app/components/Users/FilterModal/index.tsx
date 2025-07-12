import {forwardRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomModal from '@components/BottomModal';
import {TouchableOpacity} from 'react-native';
import {TypographyText} from '@components/Text/TypographyText';
import type {SortOption} from '@store/slices/favorites/types';

interface BottomModalProps {
  filter: SortOption;
  onSortSelection: (option: SortOption) => void;
}

const FilterModal = forwardRef<BottomSheetModal, BottomModalProps>(({onSortSelection}, ref) => {
  return (
    <BottomModal ref={ref}>
      <TouchableOpacity style={{marginBottom: 4, padding: 16}} onPress={() => onSortSelection('name-asc')}>
        <TypographyText>Sort by Name (A-Z)</TypographyText>
      </TouchableOpacity>
      <TouchableOpacity style={{marginBottom: 4, padding: 16}} onPress={() => onSortSelection('name-desc')}>
        <TypographyText>Sort by Name (Z-A)</TypographyText>
      </TouchableOpacity>
      <TouchableOpacity style={{padding: 16}} onPress={() => onSortSelection('id')}>
        <TypographyText>Sort by ID</TypographyText>
      </TouchableOpacity>
    </BottomModal>
  );
});

export default FilterModal;
