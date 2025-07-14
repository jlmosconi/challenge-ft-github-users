import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from 'store';
import {defaultLanguage, Language} from '@config/i18n';
import {LanguageState} from './types';

const initialState: LanguageState = {
  language: defaultLanguage,
};

const LanguageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, {payload}: PayloadAction<Language>) => {
      state.language = payload;
    },
  },
});

export const {setLanguage} = LanguageSlice.actions;

export default LanguageSlice.reducer;

/**
 * Selectors
 */
export const selectLanguage = (state: RootState) => state.language.language;
