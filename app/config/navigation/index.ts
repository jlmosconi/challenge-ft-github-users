import {darkTheme, lightTheme, ThemeMode} from '@config/theme';
import type {StackNavigationOptions} from '@react-navigation/stack';
import {DefaultTheme} from '@react-navigation/native';

export const getNavTheme = (themeMode: ThemeMode) => {
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: themeMode === ThemeMode.Dark ? darkTheme.colors.background : lightTheme.colors.background,
    },
  };
};

export const getFlatHeaderOptions = (themeMode: ThemeMode): StackNavigationOptions => {
  if (themeMode === ThemeMode.Dark) {
    return FLAT_DARK_HEADER_OPTIONS;
  }
  return FLAT_HEADER_OPTIONS;
};

export const DEFAULT_HEADER_OPTIONS = {
  headerTintColor: lightTheme.colors.background,
  headerStyle: {
    borderBottomColor: lightTheme.colors.grey.medium,
    backgroundColor: lightTheme.colors.textPrimary,
  },
};

const FLAT_HEADER_OPTIONS: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: lightTheme.colors.textPrimary,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    opacity: 0,
  },
};

// dark theme
const FLAT_DARK_HEADER_OPTIONS: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: darkTheme.colors.background,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    opacity: 0,
  },
};
