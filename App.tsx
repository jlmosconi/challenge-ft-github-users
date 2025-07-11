import {StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context';
import {ToastProvider} from 'react-native-toast-notifications';
import CONFIG from '@config/environment/current';
import {TypographyText} from '@components/Text/TypographyText';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '@store/index';
import {ThemeProvider} from '@config/theme/ThemeContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <ToastProvider duration={2500} placement="bottom">
              <View style={styles.container}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                <TypographyText>
                  {CONFIG.MODE} - {CONFIG.API.BASE_URL}
                </TypographyText>
              </View>
            </ToastProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
