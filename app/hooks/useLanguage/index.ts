import {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '@store/hooks';
import {selectLanguage, setLanguage} from '@store/slices/language';
import {changeLanguage, t as i18nT, Language} from '@config/i18n';

export const useLanguage = () => {
  const currentLanguage = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();

  const storeLanguage = (lang: Language) => {
    dispatch(setLanguage(lang));
    changeLanguage(lang);
  };

  useEffect(() => {
    changeLanguage(currentLanguage);
  }, [currentLanguage]);

  return {
    currentLanguage,
    setLanguage: storeLanguage,
    t: i18nT,
  };
};
