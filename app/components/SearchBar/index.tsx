import {type FC} from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components/native';
import {IconName} from '@components/Icon/icons';
import SpecificSizeIcon from '@components/Icon/SpecificSize';
import type {SearchBarProps} from './types';
import {IconWrapper, StyledTextInput, Wrapper} from './styled';

const SearchBar: FC<SearchBarProps> = ({
  placeholderTextColor,
  onChangeText,
  value,
  maxLength = 20,
  placeholder,
  isSearching,
  testID,
  accessibilityLabel,
  accessibilityHint,
  iconAccessibilityLabel,
}) => {
  const theme = useTheme();

  return (
    <Wrapper testID={testID}>
      <IconWrapper>
        <SpecificSizeIcon
          size={24}
          name={IconName.Search}
          color={theme.colors.grey.dark}
          accessibilityLabel={iconAccessibilityLabel}
          accessibilityRole="image"
        />
      </IconWrapper>
      <StyledTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || theme.colors.grey.medium}
        maxLength={maxLength}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        textContentType="none"
        spellCheck={false}
        accessible
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole="search"
      />
      {isSearching && <ActivityIndicator size="small" color={theme.colors.grey.dark} />}
    </Wrapper>
  );
};

export default SearchBar;
