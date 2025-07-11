import {type FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MainScreen, MainStack} from './screenRoutes';
import HomeScreen from '@screens/Home';
import AppStatusBar from '@components/AppStatusBar';
import {FillView} from './styled';

const Stack = createStackNavigator<MainStack>();

const ApplicationNavigator: FC = () => {
  return (
    <NavigationContainer>
      <FillView>
        <AppStatusBar />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={MainScreen.Home} component={HomeScreen} />
          {/* <Stack.Screen name={MainScreen.UserProfile} component={UserProfileScreen} />
                <Stack.Screen name={MainScreen.Favorites} component={FavoritesScreen} />
                <Stack.Screen name={MainScreen.Configuration} component={ConfigurationScreen} /> */}
        </Stack.Navigator>
      </FillView>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
