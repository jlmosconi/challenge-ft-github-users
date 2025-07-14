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
  return {
    headerTintColor: lightTheme.colors.background,
    headerStyle: {
      backgroundColor: themeMode === ThemeMode.Dark ? darkTheme.colors.background : lightTheme.colors.background,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      opacity: 0,
    },
  };
};
