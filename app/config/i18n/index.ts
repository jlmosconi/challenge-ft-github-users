/* eslint-disable @typescript-eslint/no-shadow */
import {I18nManager} from 'react-native';
import {I18n} from 'i18n-js';
import es from './locales/es.json';
import en from './locales/en.json';
import {getDeviceLocale} from './utils';

// uncomment this line to add more languages

enum Language {
  es = 'es',
  en = 'en',
}

const i18n = new I18n({
  ...es,
});

const isRTL = false;
i18n.defaultLocale = Language.es;

i18n.translations = {
  es,
  en,
};
i18n.enableFallback = true;

I18nManager.forceRTL(isRTL);

const deviceLocale = getDeviceLocale().substring(0, 2);
i18n.locale = Object.keys(i18n.translations).includes(deviceLocale) ? deviceLocale : i18n.defaultLocale;

export const t = i18n.t.bind(i18n);
