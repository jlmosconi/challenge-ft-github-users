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

    expect(getByTestId('mockSpecificSizeIcon').props.name).toBe(IconName.Search);
  });

  it('renders the text input with the correct placeholder and value', () => {
    const placeholder = 'Search here';
    const value = 'test';

    const {getByPlaceholderText} = renderWithTheme(
      <SearchBar placeholder={placeholder} value={value} onChangeText={() => {}} />,
    );

    expect(getByPlaceholderText(placeholder).props.value).toBe(value);
  });

  it('calls onChangeText when text changes', () => {
    const mockChange = jest.fn();

    const placeholder = 'Search...';
    const {getByPlaceholderText} = renderWithTheme(
      <SearchBar placeholder={placeholder} onChangeText={mockChange} value="" />,
    );

    fireEvent.changeText(getByPlaceholderText(placeholder), 'new value');

    expect(mockChange).toHaveBeenCalledWith('new value');
  });

  it('shows ActivityIndicator when isSearching is true', () => {
    const {getByTestId} = renderWithTheme(
      <SearchBar isSearching testID="search-bar" onChangeText={() => {}} value="" />,
    );

    // There should be an ActivityIndicator inside the wrapper
    const wrapper = getByTestId('search-bar');
    const activityIndicator = wrapper.findByType(require('react-native').ActivityIndicator);
    expect(activityIndicator).toBeTruthy();
  });
});
