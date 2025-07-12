import {type FC} from 'react';
import SafeArea from '@components/SafeArea';
import {Text} from 'react-native';
import {selectFavorites} from '@store/slices/favorites';
import {useAppSelector} from '@store/hooks';

const FavoritesScreen: FC = () => {
  const favorites = useAppSelector(selectFavorites);
  console.log('Favorites:', favorites);
  return (
    <SafeArea>
      <Text>Favorites</Text>
    </SafeArea>
  );
};

export default FavoritesScreen;
