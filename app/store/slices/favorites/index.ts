import {type PayloadAction, createSelector, createSlice} from '@reduxjs/toolkit';
import type {RootState} from 'store';
import type {FavoriteId, FavoritesState} from './types';

const initialState: FavoritesState = {
  list: {},
};

const FavoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, {payload}: PayloadAction<FavoriteId>) => {
      if (payload in state.list) {
        delete state.list[payload];
      } else {
        state.list[payload] = true;
      }
    },
  },
});

export const {toggleFavorite} = FavoritesSlice.actions;

export default FavoritesSlice.reducer;

/**
 * Selectors
 */
export const selectFavoritesMap = createSelector(
  (state: RootState) => state.favorites.list,
  list => new Map(Object.entries(list).map(([key, value]) => [Number(key), value as true])),
);
