import {DefaultTheme} from 'styled-components/native';
import {calculateREMForDevice} from '@helpers/font';
import {Dimensions, Platform} from 'react-native';
import {Body1, Body2, Button, Caption, Overline} from '@components/Text/TypographyText';

export const enum ThemePreference {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}

export const enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

const calculatedRem = calculateREMForDevice(Dimensions.get('window'));
// This is a factor to adjust the scaling based on platform differences
const platformFactor = Platform.OS === 'ios' ? 1.09 : 1;
// This function scales the size based on the calculated REM and platform factor
const scaled = (size: number) => +(size * calculatedRem * platformFactor).toFixed(2);
const spacingTransform = (size: number) => size * 8;

export const size = (s: number) => scaled(s);
export const spacing = (s: number) => spacingTransform(s);

const typography = {
  body1: Body1,
  body2: Body2,
  button: Button,
  caption: Caption,
  overline: Overline,
};

const lightTheme: DefaultTheme = {
  mode: ThemeMode.Light,
  colors: {
    background: '#ffffff',
    surface: '#f5f5f5',
    yellow: '#ffcc53',
    textPrimary: '#0f0d13',
    grey: {
      light: '#e0e0e0',
      medium: '#bdbdbd',
      dark: '#4f4f4f',
    },
  },
  size,
  spacing,
  typography,
};

const darkTheme: DefaultTheme = {
  mode: ThemeMode.Dark,
  colors: {
    background: '#0f0d13',
    surface: '#1c1c1e',
    yellow: '#ffcc53',
    textPrimary: '#ffffff',
    grey: {
      light: '#161616',
      medium: '#464548',
      dark: '#929292',
    },
  },
  size,
  spacing,
  typography,
};

export const defaultThemePreference = ThemePreference.Dark;
export const defaultThemeMode = ThemeMode.Dark;

export {lightTheme, darkTheme};
