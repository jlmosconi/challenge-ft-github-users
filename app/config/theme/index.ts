import {DefaultTheme} from 'styled-components/native';
import {calculateREMForDevice} from '@helpers/font';
import {Dimensions, Platform} from 'react-native';
import {Body1, Body2, Caption, Overline} from '@components/Text/TypographyText';

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
const platformFactor = Platform.OS === 'ios' ? 1.09 : 1;
const scaled = (size: number) => +(size * calculatedRem * platformFactor).toFixed(2);
const spacingTransform = (size: number) => size * 8;

const size = (s: number) => scaled(s);
const spacing = (s: number) => spacingTransform(s);

const typography = {
  body1: Body1,
  body2: Body2,
  overline: Overline,
  caption: Caption,
};

const lightTheme: DefaultTheme = {
  mode: ThemeMode.Light,
  colors: {
    background: '#ffffff',
    surface: '#f5f5f5',
    primary: '#ffcc53',
    textPrimary: '#0f0d13',
    textSecondary: '#4f4f4f',
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
    primary: '#ffcc53',
    textPrimary: '#ffffff',
    textSecondary: '#929292',
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

export const defaultThemePreference = ThemePreference.Light;
export const defaultThemeMode = ThemeMode.Light;

export {lightTheme as theme, darkTheme};
