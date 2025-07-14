import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';
import {lightTheme} from '@config/theme';
import SearchBar from './';
import {IconName} from '@components/Icon/icons';

// Mock SpecificSizeIcon as a <View> with testID
jest.mock('@components/Icon/SpecificSize', () => {
  const {View} = require('react-native');
  return (props: import('@components/Icon/SpecificSize/types').SpecificSizeIconProps) => {
    return <View testID="mockSpecificSizeIcon" {...props} />;
  };
});

describe('SearchBar', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
  };

  it('renders the search icon', () => {
    const {getByTestId} = renderWithTheme(<SearchBar onChangeText={() => {}} value={''} />);
    // Check that SpecificSizeIcon is rendered with the correct icon name.
    expect(getByTestId('mockSpecificSizeIcon').props.name).toBe(IconName.Search);
  });

  it('renders the text input with the correct placeholder and value', () => {
    const placeholder = 'Search here';
    const value = 'test';

    const {getByPlaceholderText} = renderWithTheme(
      <SearchBar placeholder={placeholder} value={value} onChangeText={() => {}} />,
    );
    // Ensure the input field renders with the given placeholder and value.
    expect(getByPlaceholderText(placeholder).props.value).toBe(value);
  });

  it('calls onChangeText when text changes', () => {
    const mockChange = jest.fn();

    const placeholder = 'Search...';
    const {getByPlaceholderText} = renderWithTheme(
      <SearchBar placeholder={placeholder} onChangeText={mockChange} value="" />,
    );

    // Simulate user typing new text.
    fireEvent.changeText(getByPlaceholderText(placeholder), 'new value');

    // Ensure onChangeText is called with the new value.
    expect(mockChange).toHaveBeenCalledWith('new value');
  });

  it('shows ActivityIndicator when isSearching is true', () => {
    const {getByTestId} = renderWithTheme(
      <SearchBar isSearching testID="search-bar" onChangeText={() => {}} value="" />,
    );

    // Find the wrapper and check for ActivityIndicator inside it.
    const wrapper = getByTestId('search-bar');
    const activityIndicator = wrapper.findByType(require('react-native').ActivityIndicator);
    expect(activityIndicator).toBeTruthy();
  });
});
