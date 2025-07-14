import {type FC, useCallback} from 'react';
import Toggle from '@components/Toggle';
import {ThemeMode, ThemePreference} from '@config/theme';
import {selectThemeMode, setThemePreference} from '@store/slices/theme';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {Language} from '@config/i18n';
import SafeArea from '@components/SafeArea';
import {ItemTitle, ListContainer, ListItem} from './styled';
import {useLanguage} from '@hooks/useLanguage';

const ConfigurationScreen: FC = () => {
  const currentMode = useAppSelector(selectThemeMode);

  const dispatch = useAppDispatch();
  const {language, setLanguage, t} = useLanguage();

  const onChangeAppearance = useCallback(() => {
    const preference = currentMode === ThemeMode.Dark ? ThemePreference.Light : ThemePreference.Dark;
    const mode = currentMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;

    dispatch(
      setThemePreference({
        preference,
        mode,
      }),
    );
  }, [dispatch, currentMode]);

  return (
    <SafeArea>
      <ListContainer mv={2}>
        <ListItem onPress={onChangeAppearance}>
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
