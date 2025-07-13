import reducer, {setLanguage, selectLanguage} from '.';
import {Language} from '@config/i18n';
import type {LanguageState} from './types';

describe('language slice', () => {
  const initialState: LanguageState = {
    language: Language.es,
  };

  it('should handle setLanguage action', () => {
    const nextState = reducer(initialState, setLanguage(Language.en));
    expect(nextState.language).toBe(Language.en);
  });

  it('selectLanguage selector returns current language', () => {
    const fakeState = {
      language: {
        language: Language.en,
      },
    };

    expect(selectLanguage(fakeState as any)).toBe(Language.en);
  });
});
