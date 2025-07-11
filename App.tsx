import 'react-native-gesture-handler';
import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context';
import {ToastProvider} from 'react-native-toast-notifications';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '@store/index';
import {ThemeProvider} from '@config/theme/ThemeContext';
import ApplicationNavigator from '@navigators/ApplicationNavigator';

function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <ToastProvider duration={2500} placement="bottom">
              <ApplicationNavigator />
            </ToastProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
