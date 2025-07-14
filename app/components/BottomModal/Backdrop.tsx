import {BottomSheetBackdrop, BottomSheetBackdropProps} from '@gorhom/bottom-sheet';

export const RenderDefaultBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    {...props}
    // eslint-disable-next-line react-native/no-inline-styles
    style={{zIndex: 1}}
  />
);
