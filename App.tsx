import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import CONFIG from '@config/environment/current';
import {useEffect} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    crashlytics().log('App mounted.');
    crashlytics().recordError(new Error('Test error for Crashlytics'));
  }, []);

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
