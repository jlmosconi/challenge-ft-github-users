import {type FC} from 'react';
import {IconName} from '@components/Icon/icons';
import SpecificSizeIcon from '@components/Icon/SpecificSize';
import {IconWrapper, StyledTextInput, Wrapper} from './styled';
import type {SearchBarProps} from './types';
import {useTheme} from 'styled-components/native';
import {ActivityIndicator} from 'react-native';

const SearchBar: FC<SearchBarProps> = ({
  placeholderTextColor,
  onChangeText,
  value,
  maxLength = 20,
  placeholder,
  isSearching,
  testID,
}) => {
  const theme = useTheme();

  return (
    <Wrapper testID={testID}>
      <IconWrapper>
        <SpecificSizeIcon size={24} name={IconName.Search} color={theme.colors.grey.dark} />
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
      />
      {isSearching && <ActivityIndicator size="small" color={theme.colors.grey.dark} />}
    </Wrapper>
  );
};

export default SearchBar;
