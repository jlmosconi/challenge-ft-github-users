import {type FC, PropsWithChildren} from 'react';
import {Appearance} from 'react-native';
import {type DefaultTheme, ThemeProvider as StyledThemeProvider} from 'styled-components/native';
import {theme, darkTheme, ThemePreference} from '.';
import {useAppSelector} from '@store/hooks';
import {selectThemePreference} from '@store/slices/theme';

const getCurrentTheme = (preference: ThemePreference, systemTheme: DefaultTheme): DefaultTheme => {
  switch (preference) {
    case ThemePreference.Light:
      return theme;
    case ThemePreference.Dark:
      return darkTheme;
    default:
      return systemTheme;
  }
};

export const ThemeProvider: FC<PropsWithChildren> = ({children}) => {
  const systemThemePreference = Appearance.getColorScheme() === ThemePreference.Dark ? darkTheme : theme;
  const userThemePreference = useAppSelector(selectThemePreference);
  const currentTheme = getCurrentTheme(userThemePreference, systemThemePreference);

  return <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>;
};
