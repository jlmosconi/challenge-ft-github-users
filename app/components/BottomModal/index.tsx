/* eslint-disable react-native/no-inline-styles */
import {type PropsWithChildren, forwardRef} from 'react';
import {useTheme} from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Edge} from '@config/constants/edges';
import {RenderDefaultBackdrop} from './Backdrop';
import {SheetView} from './styled';

interface BottomModalProps {}

const BottomModal = forwardRef<BottomSheetModal, PropsWithChildren<BottomModalProps>>(({children}, ref) => {
  const theme = useTheme();
  return (
    <BottomSheetModal
      ref={ref}
      backdropComponent={RenderDefaultBackdrop}
      containerStyle={{zIndex: 1}}
      backgroundStyle={{
        backgroundColor: theme.colors.surface,
      }}>
      <SheetView>
        <SafeAreaView edges={[Edge.Bottom]}>{children}</SafeAreaView>
      </SheetView>
    </BottomSheetModal>
  );
});

export default BottomModal;
