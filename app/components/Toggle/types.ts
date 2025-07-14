export interface ToggleWrapperProps {
  disabled?: boolean
  checked?: boolean
  label?: string
}

export interface ToggleProps extends ToggleWrapperProps {
  testID?: string
  onPress?: () => void
}
