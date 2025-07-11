import {ImageResizeMode} from 'react-native'

export interface LazyImageProps {
  source: {uri: string}
  containerStyle?: ContainerStyle
  fallback?: React.ReactNode
  resizeMode?: ImageResizeMode
}

export interface ContainerStyle {
  width?: number
  height?: number
  borderRadius?: number
  backgroundColor?: string
}
