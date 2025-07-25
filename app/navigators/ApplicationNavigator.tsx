/* eslint-disable react/no-unstable-nested-components */
import {type FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from 'styled-components/native';
import {getFlatHeaderOptions, getNavTheme} from '@config/navigation';
import {navigate, navigateBack, navigationReadyRef, navigationRef} from '@utils/navigation';
import {useLanguage} from '@hooks/useLanguage';
import {MainScreen, MainStack} from './screenRoutes';
import AppStatusBar from '@components/AppStatusBar';
import BackButton from '@components/ScreenOptions/BackButton';
import StarButton from '@components/ScreenOptions/StarButton';
import HeaderTitle from '@components/ScreenOptions/HeaderTitle';
import HomeScreen from '@screens/Home';
import FavoritesScreen from '@screens/Favorites';
import ConfigurationButton from '@components/ScreenOptions/ConfigurationButton';
import UserScreen from '@screens/User';
import ConfigurationScreen from '@screens/Configuration';
import {FillView} from './styled';

const Stack = createStackNavigator<MainStack>();

const ApplicationNavigator: FC = () => {
  const theme = useTheme();
  const {t} = useLanguage();

  const headerLeft = () => (
    <BackButton onPress={navigateBack} accessibilityLabel={t('common.accessibility.back.label')} />
  );
  const homeHeaderRight = () => (
    <>
      <StarButton
        onPress={() => navigate(MainScreen.Favorites)}
        accessibilityLabel={t('common.accessibility.favorites.label')}
      />
      <ConfigurationButton
        onPress={() => navigate(MainScreen.Configuration)}
        accessibilityLabel={t('common.accessibility.configuration.label')}
      />
    </>
  );

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={getNavTheme(theme.mode)}
      onReady={() => {
        // Ensure navigation is ready before allowing any navigation actions
        navigationReadyRef.current = true;
      }}>
      <FillView>
        <AppStatusBar />
        <Stack.Navigator
          initialRouteName={MainScreen.Home}
          screenOptions={{...getFlatHeaderOptions(theme.mode), headerLeft}}>
          <Stack.Screen
            name={MainScreen.Home}
            component={HomeScreen}
            options={{
              headerLeft: () => null,
              headerRight: homeHeaderRight,
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
          <Stack.Screen
            name={MainScreen.Configuration}
            component={ConfigurationScreen}
            options={{
              headerTitle: () => <HeaderTitle title={t('config.title')} />,
            }}
          />
        </Stack.Navigator>
      </FillView>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
