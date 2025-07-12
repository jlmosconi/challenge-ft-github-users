import {BottomSheetModalProps} from '@gorhom/bottom-sheet';

export type HandleContentLayoutProps = {
  nativeEvent: {
    layout: {height: number};
  };
};
export interface BottomModalProps extends Partial<BottomSheetModalProps> {
  children: React.ReactNode;
  name: string;
  snapPoints?: Array<string | number>;
  dynamicHeight?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  paddingContent?: number;
  dismissOnBackAndroid?: boolean;
  backdropDisable?: boolean;
}
