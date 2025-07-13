import {type FC} from 'react';
import {type RouteProp} from '@react-navigation/native';
import {MainScreen, MainStack} from '@navigators/screenRoutes';
import {Text, View} from 'react-native';

type Props = {route: RouteProp<MainStack, MainScreen.User>};

const UserScreen: FC<Props> = ({route}) => {
  console.log('UserScreen route params:', route.params);
  return (
    <View>
      <Text>UserScreen</Text>
    </View>
  );
};
export default UserScreen;
