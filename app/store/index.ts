import {combineReducers, configureStore, type ThunkDispatch, type UnknownAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

import themeReducer from '@store/slices/theme';
import languageReducer from '@store/slices/language';
import usersReducer from '@store/slices/users';
import favoritesReducer from '@store/slices/favorites';
import {baseApi} from '@services/api';

const themeConfig = {
  key: 'theme',
  storage: AsyncStorage,
};

const languageConfig = {
  key: 'language',
  storage: AsyncStorage,
};

const usersConfig = {
  key: 'users',
  storage: AsyncStorage,
  blacklist: ['list', 'isFetching', 'hasError'], // Exclude list, isFetching, and hasError from persistence
};

const favoritesConfig = {
  key: 'favorites',
  storage: AsyncStorage,
};

// Combine all reducers into a single root reducer
const combinedReducers = combineReducers({
  theme: persistReducer(themeConfig, themeReducer),
  language: persistReducer(languageConfig, languageReducer),
  users: persistReducer(usersConfig, usersReducer),
  favorites: persistReducer(favoritesConfig, favoritesReducer),
  [baseApi.reducerPath]: baseApi.reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof combinedReducers>;
export type AppDispatch = ThunkDispatch<RootState, any, UnknownAction>;

// Configure the store with the combined reducers and middleware
const store = configureStore({
  reducer: combinedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore these actions for serializability checks
      },
    }).concat([baseApi.middleware]),
});

const persistor = persistStore(store);

export {store, persistor};
