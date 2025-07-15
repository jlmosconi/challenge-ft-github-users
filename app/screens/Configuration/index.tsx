import {type FC, useCallback} from 'react';
import {Language} from '@config/i18n';
import {useLanguage} from '@hooks/useLanguage';
import {useThemePreference} from '@hooks/useThemePreference';
import SafeArea from '@components/SafeArea';
import Toggle from '@components/Toggle';
import {getConfigItems} from './data';
import {ItemTitle, ListContainer, ListItem} from './styled';

const ConfigurationScreen: FC = () => {
  const {currentMode, toggleTheme} = useThemePreference();
  const {currentLanguage, setLanguage, t} = useLanguage();

  const toggleLanguage = useCallback(() => {
    setLanguage(currentLanguage === Language.en ? Language.es : Language.en);
  }, [currentLanguage, setLanguage]);

  const items = getConfigItems(currentMode, currentLanguage, toggleLanguage, toggleTheme, t);

  return (
    <SafeArea>
      <ListContainer mt={2}>
        {items.map(item => (
          <ListItem key={item.title} onPress={item.onPress}>
            <ItemTitle>{item.title}</ItemTitle>
            <Toggle
              testID={item.testID}
              accessibilityLabel={item.title}
              accessibilityRole="switch"
              checked={item.value}
            />
          </ListItem>
        ))}
      </ListContainer>
    </SafeArea>
  );
};

export default ConfigurationScreen;
