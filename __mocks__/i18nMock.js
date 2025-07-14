jest.mock('@config/i18n', () => ({
  changeLanguage: jest.fn(),
  t: jest.fn().mockImplementation(key => key),
  Language: {
    es: 'es',
    en: 'en',
  },
}));

const I18n = {
  t: jest.fn().mockImplementation(key => key),
  i18n: {
    changeLanguage: jest.fn(),
  },
};

export default I18n;
