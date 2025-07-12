import {type FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MainScreen, MainStack} from './screenRoutes';
import HomeScreen from '@screens/Home';
import AppStatusBar from '@components/AppStatusBar';
import {FillView} from './styled';
import HeaderTitle from '@components/ScreenOptions/HeaderTitle';
import {t} from '@config/i18n';
import {DEFAULT_HEADER_OPTIONS, getFlatHeaderOptions} from '@config/navigation';
import {useTheme} from 'styled-components/native';
import BackButton from '@components/ScreenOptions/BackButton';
import {navigate, navigateBack, navigationReadyRef, navigationRef} from '@utils/navigation';
import StarButton from '@components/ScreenOptions/StarButton';
import FavoritesScreen from '@screens/Favorites';

const Stack = createStackNavigator<MainStack>();

const ApplicationNavigator: FC = () => {
  const theme = useTheme();

  const headerLeft = () => <BackButton onPress={navigateBack} />;
  const starButton = () => <StarButton onPress={() => navigate(MainScreen.Favorites)} />;

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        navigationReadyRef.current = true;
      }}>
      <FillView>
        <AppStatusBar />
        <Stack.Navigator
          initialRouteName={MainScreen.Home}
          screenOptions={{
            ...DEFAULT_HEADER_OPTIONS,
            ...getFlatHeaderOptions(theme.mode),
            headerLeft,
          }}>
          <Stack.Screen
            name={MainScreen.Home}
            component={HomeScreen}
            options={{
              headerLeft: () => null,
              headerRight: starButton,
            }}
          />
          <Stack.Screen
            name={MainScreen.Favorites}
            component={FavoritesScreen}
            options={{
              headerTitle: () => <HeaderTitle title={t('favorites.title')} />,
            }}
          />
          {/* <Stack.Screen name={MainScreen.UserProfile} component={UserProfileScreen} />
                <Stack.Screen name={MainScreen.Favorites} component={FavoritesScreen} />
                <Stack.Screen name={MainScreen.Configuration} component={ConfigurationScreen} /> */}
        </Stack.Navigator>
      </FillView>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
