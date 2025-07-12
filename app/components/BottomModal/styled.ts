import {BottomSheetView} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

export const SheetView = styled(BottomSheetView)`
  padding: ${({theme}) => theme.size(theme.spacing(2))}px;
`;
