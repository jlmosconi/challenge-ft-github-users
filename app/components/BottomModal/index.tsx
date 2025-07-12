import {PropsWithChildren, forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {RenderDefaultBackdrop} from './Backdrop';

interface BottomModalProps {}

const BottomModal = forwardRef<BottomSheetModal, PropsWithChildren<BottomModalProps>>(({children}, ref) => {
  return (
    <BottomSheetModal
      ref={ref}
      backdropComponent={RenderDefaultBackdrop}
      // eslint-disable-next-line react-native/no-inline-styles
      containerStyle={{zIndex: 1}}>
      <BottomSheetView style={styles.content}>{children}</BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});

export default BottomModal;
