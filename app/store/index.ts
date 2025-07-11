import {combineReducers, configureStore, type ThunkDispatch, type UnknownAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

import loaderReducer from '@store/slices/loader';
import themeReducer from '@store/slices/theme';

const themeConfig = {
  key: 'theme',
  storage: AsyncStorage,
};

// Combine all reducers into a single root reducer
const combinedReducers = combineReducers({
  loader: loaderReducer,
  theme: persistReducer(themeConfig, themeReducer),
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
