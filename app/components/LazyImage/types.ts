import type {ResizeMode} from 'react-native-fast-image';

export interface LazyImageProps {
  source: {uri: string};
  containerStyle?: ContainerStyle;
  fallback?: React.ReactNode;
  resizeMode?: ResizeMode;
}

export interface ContainerStyle {
  width?: number;
  height?: number;
  borderRadius?: number;
  backgroundColor?: string;
}
