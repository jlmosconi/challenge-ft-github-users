import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from 'store';
import type {FavoritesState, FavoriteUser} from './types';

const initialState: FavoritesState = {
  list: {},
  filter: 'id', // Default sort option
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
    setFilter: (state, {payload}: PayloadAction<FavoritesState['filter']>) => {
      state.filter = payload;
    },
  },
});

export const {toggleFavorite, setFilter} = FavoritesSlice.actions;

export default FavoritesSlice.reducer;

/**
 * Selectors
 */
export const selectFavorites = (state: RootState) => state.favorites.list;
export const selectFavoritesFilter = (state: RootState) => state.favorites.filter;
