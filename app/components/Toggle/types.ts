export interface ToggleWrapperProps {
  disabled?: boolean;
  checked?: boolean;
  accessibilityLabel?: string;
}

export interface ToggleProps extends ToggleWrapperProps {
  testID?: string;
  onPress?: () => void;
}
