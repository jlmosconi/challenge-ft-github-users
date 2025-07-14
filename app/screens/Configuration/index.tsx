import {type FC} from 'react';
import Toggle from '@components/Toggle';
import {ThemeMode} from '@config/theme';
import {Language} from '@config/i18n';
import SafeArea from '@components/SafeArea';
import {ItemTitle, ListContainer, ListItem} from './styled';
import {useLanguage} from '@hooks/useLanguage';
import {useThemePreference} from '@hooks/useThemePreference';

const ConfigurationScreen: FC = () => {
  const {currentMode, toggleTheme} = useThemePreference();
  const {language, setLanguage, t} = useLanguage();

  return (
    <SafeArea>
      <ListContainer mv={2}>
        <ListItem onPress={toggleTheme}>
          <ItemTitle>{t('config.dark_mode')}</ItemTitle>
          <Toggle testID="theme-toggle" checked={currentMode === ThemeMode.Dark} />
        </ListItem>
        <ListItem onPress={() => setLanguage(language === Language.en ? Language.es : Language.en)}>
          <ItemTitle>{t('config.spanish')}</ItemTitle>
          <Toggle testID="language-toggle" checked={language === Language.es} />
        </ListItem>
      </ListContainer>
    </SafeArea>
  );
};
export default ConfigurationScreen;
