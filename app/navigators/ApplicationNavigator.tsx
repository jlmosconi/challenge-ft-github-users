import {useMemo, type FC} from 'react';
import {t} from '@config/i18n';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from 'styled-components/native';
import {DEFAULT_HEADER_OPTIONS, getFlatHeaderOptions, getNavTheme} from '@config/navigation';
import {navigate, navigateBack, navigationReadyRef, navigationRef} from '@utils/navigation';
import {MainScreen, MainStack} from './screenRoutes';
import AppStatusBar from '@components/AppStatusBar';
import BackButton from '@components/ScreenOptions/BackButton';
import StarButton from '@components/ScreenOptions/StarButton';
import HeaderTitle from '@components/ScreenOptions/HeaderTitle';
import HomeScreen from '@screens/Home';
import FavoritesScreen from '@screens/Favorites';
import UserScreen from '@screens/User';
import {FillView} from './styled';

const Stack = createStackNavigator<MainStack>();

const ApplicationNavigator: FC = () => {
  const theme = useTheme();

  const headerLeft = () => <BackButton onPress={navigateBack} />;
  const starButton = () => <StarButton onPress={() => navigate(MainScreen.Favorites)} />;

  const defaultScreenOptions = useMemo(() => {
    return {...DEFAULT_HEADER_OPTIONS, ...getFlatHeaderOptions(theme.mode), headerLeft};
  }, [theme.mode]);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={getNavTheme(theme.mode)}
      onReady={() => {
        navigationReadyRef.current = true;
      }}>
      <FillView>
        <AppStatusBar />
        <Stack.Navigator initialRouteName={MainScreen.Home} screenOptions={defaultScreenOptions}>
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
          <Stack.Screen name={MainScreen.User} component={UserScreen} />
          {/*<Stack.Screen name={MainScreen.Configuration} component={ConfigurationScreen} /> */}
        </Stack.Navigator>
      </FillView>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
