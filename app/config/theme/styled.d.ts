import {TypographyType} from '@components/Text/TypographyText';
import {ThemeMode} from '@store/slices/theme/types';
import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    mode: ThemeMode;
    colors: {
      neutral: {
        black: string;
        white: string;
      };
    };
    size: (s: number) => number;
    spacing: (s: number) => number;
    typography: {
      body1: TypographyType;
      body2: TypographyType;
      caption: TypographyType;
      overline: TypographyType;
    };
  }
}
