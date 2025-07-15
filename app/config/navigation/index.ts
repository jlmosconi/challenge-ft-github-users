import {darkTheme, lightTheme, ThemeMode} from '@config/theme';
import type {StackNavigationOptions} from '@react-navigation/stack';
import {DefaultTheme} from '@react-navigation/native';

const getBackgroundColor = (themeMode: ThemeMode) => {
  return themeMode === ThemeMode.Dark ? darkTheme.colors.background : lightTheme.colors.background;
};

export const getNavTheme = (themeMode: ThemeMode) => {
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: getBackgroundColor(themeMode),
    },
  };
};

export const getFlatHeaderOptions = (themeMode: ThemeMode): StackNavigationOptions => {
  return {
    headerTintColor: lightTheme.colors.background,
    headerStyle: {
      backgroundColor: getBackgroundColor(themeMode),
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      opacity: 0,
    },
  };
};
