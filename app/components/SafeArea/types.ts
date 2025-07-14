export interface ContainerProps {
  padding?: number;
}

export interface WrapperProps {
  color?: string;
}

export interface SafeAreaProps extends ContainerProps, WrapperProps {
  disableVertical?: boolean;
  disableHorizontal?: boolean;
  disableBottom?: boolean;
  disableTop?: boolean;
}
