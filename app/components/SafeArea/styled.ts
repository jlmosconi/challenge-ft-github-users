import { SafeAreaView } from "react-native-safe-area-context"
import styled from "styled-components/native"
import { ContainerProps, WrapperProps } from "./types"

export const Wrapper = styled(SafeAreaView)<WrapperProps>`
  flex: 1;
  ${({ color }) => `background-color: ${color}`};
`

export const Container = styled.View<ContainerProps>`
  flex: 1;
  ${({ padding, theme }) => `padding: ${theme.size(padding || 0)}px`};
`
