import {FC, PropsWithChildren, createContext} from 'react';
import {defaultLanguage, Language} from '@config/i18n';
import {useLanguage} from '@hooks/useLanguage';
import {t as i18nT} from '@config/i18n';

interface LanguageContextProps {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: typeof i18nT;
}

export const LanguageContext = createContext<LanguageContextProps>({
  currentLanguage: defaultLanguage,
  setLanguage: () => {},
  t: i18nT,
});

export const LanguageProvider: FC<PropsWithChildren> = ({children}) => {
  const languageState = useLanguage();

  return <LanguageContext.Provider value={languageState}>{children}</LanguageContext.Provider>;
};
