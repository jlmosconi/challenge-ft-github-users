import { ViewProps } from "react-native"

export interface IBox {
  m?: number
  mt?: number
  mb?: number
  mv?: number
  ml?: number
  mr?: number
  mh?: number
  p?: number
  pt?: number
  pb?: number
  pv?: number
  pl?: number
  pr?: number
  ph?: number
  h?: number
}

export interface ISpacingBox extends ViewProps, IBox {}
