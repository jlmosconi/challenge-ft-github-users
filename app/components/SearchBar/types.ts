export interface ToggleWrapperProps {}

export interface SearchBarProps {
  placeholderTextColor?: string;
  onChangeText: (text: string) => void;
  value: string;
  maxLength?: number;
  placeholder?: string;
  isSearching?: boolean;
  testID?: string;
}
