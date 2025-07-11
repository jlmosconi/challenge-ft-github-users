import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context';
import {ToastProvider} from 'react-native-toast-notifications';
import CONFIG from '@config/environment/current';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ToastProvider duration={2500} placement="bottom">
        <View style={styles.container}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginTop: 150,
            }}>
            {CONFIG.MODE} - {CONFIG.API.BASE_URL}
          </Text>
        </View>
      </ToastProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
