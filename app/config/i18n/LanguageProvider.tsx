import {type FC, type PropsWithChildren, createContext} from 'react';
import {Language} from '@config/i18n';
import {useLanguage} from '@hooks/useLanguage';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: Language.es,
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: FC<PropsWithChildren> = ({children}) => {
  const languageState = useLanguage();

  return <LanguageContext.Provider value={languageState}>{children}</LanguageContext.Provider>;
};
