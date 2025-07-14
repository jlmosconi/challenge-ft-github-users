import {getLocales} from 'react-native-localize';

export const getDeviceLocale = () => {
  const locales = getLocales();

  if (locales.length > 0 && locales[0].languageTag) {
    return locales[0].languageTag;
  }

  return 'es-AR';
};
