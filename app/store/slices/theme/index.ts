import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from 'store';
import type {ThemeState} from './types';
import {defaultThemeMode, defaultThemePreference, ThemeMode, ThemePreference} from '@config/theme';

const initialState: ThemeState = {
  preference: defaultThemePreference,
  mode: defaultThemeMode,
};

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemePreference: (state, {payload}: PayloadAction<{preference: ThemePreference; mode: ThemeMode}>) => {
      state.preference = payload.preference;
      state.mode = payload.mode;
    },
  },
});

export const {setThemePreference} = ThemeSlice.actions;

export default ThemeSlice.reducer;

/**
 * Selectors
 */
export const selectThemePreference = (state: RootState) => state.theme.preference;
export const selectThemeMode = (state: RootState) => state.theme.mode;
