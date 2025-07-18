import {ThemeMode} from '@config/theme';
import {Language} from '@config/i18n';

export const getConfigItems = (
  currentMode: ThemeMode,
  currentLanguage: Language,
  toggleLanguage: () => void,
  toggleTheme: () => void,
  t: (key: string) => string,
) => [
  {
    title: t('config.dark_mode'),
    value: currentMode === ThemeMode.Dark,
    onPress: toggleTheme,
    testID: 'theme-toggle',
    hint: t('config.dark_mode_hint'),
  },
  {
    title: t('config.spanish'),
    value: currentLanguage === Language.es,
    onPress: toggleLanguage,
    testID: 'language-toggle',
    hint: t('config.spanish_hint'),
  },
];
