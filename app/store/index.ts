import {combineReducers, configureStore, type ThunkDispatch, type UnknownAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

import themeReducer from '@store/slices/theme';
import languageReducer from '@store/slices/language';
import usersReducer from '@store/slices/users';
import favoritesReducer from '@store/slices/favorites';

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
  blacklist: ['isFetching'], // Avoid persisting the fetching state
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
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: __DEV__,
});

const persistor = persistStore(store);

export {store, persistor};
