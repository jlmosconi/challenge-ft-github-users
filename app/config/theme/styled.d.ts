import {TypographyType} from '@components/Text/TypographyText';
import {ThemeMode} from '@store/slices/theme/types';
import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    mode: ThemeMode;
    colors: {
      background: string;
      surface: string;
      yellow: string;
      textPrimary: string;
      grey: {
        light: string;
        medium: string;
        dark: string;
      };
    };
    size: (s: number) => number;
    spacing: (s: number) => number;
    typography: {
      body1: TypographyType;
      body2: TypographyType;
      button: TypographyType;
      caption: TypographyType;
      overline: TypographyType;
    };
  }
}
