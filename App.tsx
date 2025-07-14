import 'react-native-gesture-handler';
import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '@store/index';
import {ThemeProvider} from '@config/theme/ThemeContext';
import {LanguageProvider} from '@config/i18n/LanguageProvider';
import ApplicationNavigator from '@navigators/ApplicationNavigator';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundaryWrapper';

function App() {
  return (
    // ErrorBoundary to catch and handle errors in the app.
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      {/* Redux store provider for global state management. scalability and predictable state handling. */}
      <Provider store={store}>
        {/* Prevents UI flicker by waiting for persisted Redux state. better UX on app startup. */}
        <PersistGate loading={null} persistor={persistor}>
          {/* ThemeProvider for consistent theming across the app. */}
          <ThemeProvider>
            <ErrorBoundary>
              {/* LanguageProvider for managing language settings and translations. */}
              <LanguageProvider>
                <BottomSheetModalProvider>
                  <ApplicationNavigator />
                </BottomSheetModalProvider>
              </LanguageProvider>
            </ErrorBoundary>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
