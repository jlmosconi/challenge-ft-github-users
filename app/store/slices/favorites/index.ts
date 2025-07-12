import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from 'store';
import type {FavoritesState, FavoriteUser} from './types';

const initialState: FavoritesState = {
  list: {},
};

const FavoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, {payload}: PayloadAction<FavoriteUser>) => {
      if (payload.id in state.list) {
        delete state.list[payload.id];
      } else {
        state.list[payload.id] = payload;
      }
    },
  },
});

export const {toggleFavorite} = FavoritesSlice.actions;

export default FavoritesSlice.reducer;

/**
 * Selectors
 */
export const selectFavorites = (state: RootState) => state.favorites.list;
