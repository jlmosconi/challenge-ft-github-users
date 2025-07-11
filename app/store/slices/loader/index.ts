import {
  createSlice,
  type PayloadAction,
  type Action,
  type UnknownAction,
} from '@reduxjs/toolkit';
import type {RootState} from 'store';
import type {IFetchingPayload} from '../types';
import type {LoaderSlice} from './types';

function isFetchingAction(action: UnknownAction): action is Action {
  return action.type.endsWith('Start');
}

function isSuccessAction(action: UnknownAction): action is Action {
  return action.type.endsWith('Success');
}

function isErrorAction(action: UnknownAction): action is Action {
  return action.type.endsWith('Failed');
}

const initialState: LoaderSlice = {status: false, text: ''};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoaderStatus: (state: LoaderSlice, action: PayloadAction<boolean>) => {
      state.status = action.payload;
      state.text = '';
    },
    setLoaderStatusWithText: (
      state: LoaderSlice,
      action: PayloadAction<{status: boolean; text: string}>,
    ) => {
      state.status = action.payload.status;
      state.text = action.payload.text;
    },
    showLoader: (state: LoaderSlice, action: PayloadAction<string>) => {
      state.status = true;
      state.text = action.payload;
    },
    hideLoader: (state: LoaderSlice) => {
      state.status = false;
      state.text = '';
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isFetchingAction,
        (state, action: Action & {payload?: IFetchingPayload}) => {
          state.status = action.payload?.globalLoader ?? true;
          state.text = action.payload?.loadingText ?? '';
        },
      )
      .addMatcher(isSuccessAction, state => {
        state.status = false;
        state.text = '';
      })
      .addMatcher(isErrorAction, state => {
        state.status = false;
        state.text = '';
      });
  },
});

export const {
  setLoaderStatus,
  setLoaderStatusWithText,
  showLoader,
  hideLoader,
} = loaderSlice.actions;

export default loaderSlice.reducer;

/**
 * Selectors
 */

export const selectLoaderStatus = (state: RootState) => state.loader.status;
export const selectLoaderText = (state: RootState) => state.loader.text;
