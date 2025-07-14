/* eslint-disable @typescript-eslint/no-shadow */
import {I18nManager} from 'react-native';
import {I18n} from 'i18n-js';
import es from './locales/es.json';
import en from './locales/en.json';
import {getDeviceLocale} from './utils';

export enum Language {
  es = 'es',
  en = 'en',
}
export const defaultLanguage: Language = Language.es;

const i18n = new I18n();

i18n.defaultLocale = defaultLanguage;
i18n.translations = {
  es,
  en,
};
i18n.enableFallback = true;

I18nManager.forceRTL(false);

const deviceLocale = getDeviceLocale().substring(0, 2) as Language;

i18n.locale = Object.keys(i18n.translations).includes(deviceLocale) ? deviceLocale : i18n.defaultLocale;

export const changeLanguage = (lang: Language) => {
  i18n.locale = lang;
};

export const t = i18n.t.bind(i18n);
