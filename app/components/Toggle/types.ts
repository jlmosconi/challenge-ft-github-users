export interface ToggleWrapperProps {
  disabled?: boolean;
  checked?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: 'switch' | 'checkbox';
}

export interface ToggleProps extends ToggleWrapperProps {
  testID?: string;
  onPress?: () => void;
}
