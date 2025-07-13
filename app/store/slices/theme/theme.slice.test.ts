import reducer, {setThemePreference, selectThemePreference, selectThemeMode} from '../theme';

import {ThemeMode, ThemePreference} from '@config/theme';
import type {ThemeState} from './types';

describe('theme slice', () => {
  const initialState: ThemeState = {
    preference: ThemePreference.System,
    mode: ThemeMode.Light,
  };

  it('should handle setThemePreference action', () => {
    const payload = {
      preference: ThemePreference.Dark,
      mode: ThemeMode.Dark,
    };

    const nextState = reducer(initialState, setThemePreference(payload));

    expect(nextState.preference).toBe(payload.preference);
    expect(nextState.mode).toBe(payload.mode);
  });

  it('selectThemePreference selector returns current preference', () => {
    const fakeState = {
      theme: {
        preference: ThemePreference.Dark,
        mode: ThemeMode.Dark,
      },
    };

    expect(selectThemePreference(fakeState as any)).toBe(ThemePreference.Dark);
  });

  it('selectThemeMode selector returns current mode', () => {
    const fakeState = {
      theme: {
        preference: ThemePreference.Dark,
        mode: ThemeMode.Dark,
      },
    };

    expect(selectThemeMode(fakeState as any)).toBe(ThemeMode.Dark);
  });
});
