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
    neutral: {
      black: '#1E252E',
      white: '#FFFFFF',
    },
  },
  size,
  spacing,
  typography,
};

const darkTheme: DefaultTheme = {
  mode: ThemeMode.Dark,
  colors: {
    neutral: {
      black: '#CCCCCC',
      white: '#1c1c1e',
    },
  },
  size,
  spacing,
  typography,
};

export const defaultThemePreference = ThemePreference.Light;
export const defaultThemeMode = ThemeMode.Light;

export {lightTheme as theme, darkTheme};
