import {useCallback, type FC} from 'react';
import SafeArea from '@components/SafeArea';
import type {FavoriteUser} from '@store/slices/favorites/types';
import ScrollList from '@components/ScrollList';
import ListFooter from '@components/Users/ListFooter';
import ListEmpty from '@components/Users/ListEmpty';
import SpacingBox from '@components/SpacingBox';
import SearchBox from '@components/Users/SearchBox';
import {Body2, TypographyText, Weight} from '@components/Text/TypographyText';
import UserRenderItem from '@components/Users/RenderItem';
import EmptyState from '@components/EmptyState';
import {IconName} from '@components/Icon/icons';
import {MainScreen} from '@navigators/screenRoutes';
import {navigate} from '@utils/navigation';
import {useFavoriteActions} from '@hooks/useFavoriteActions';
import {useLanguage} from '@hooks/useLanguage';
import {useUsersList} from '@hooks/useUsersList';

/**
 * SOLID - Keeps this screen focused on UI; logic sits in hooks for better separation.
 * KISS  - Keeps things simple and easier to read by avoiding too much logic here.
 * DRY   - Avoids repeating user logic everywhere by reusing hooks.
 */
const HomeScreen: FC = () => {
  const {userList, loading, isSearching, hasError, handleOnSearch, handleOnRefresh, handleFetchNextUsers} =
    useUsersList();

  const {t} = useLanguage();
  const {isFavorite, handleOnFavoritePress} = useFavoriteActions();

  const navigateToUserScreen = useCallback((username: string) => navigate(MainScreen.User, {username}), []);

  const renderItem = useCallback(
    ({item}: {item: FavoriteUser}) => (
      <UserRenderItem
        user={item}
        isFavorite={isFavorite(item.id)}
        onPress={() => navigateToUserScreen(item.login)}
        onFavoritePress={handleOnFavoritePress}
      />
    ),
    [handleOnFavoritePress, isFavorite, navigateToUserScreen],
  );

  return (
    <SafeArea>
      <SpacingBox mb={1}>
        <TypographyText type={Body2} weight={Weight.BOLD} testID="homeTitle">
          {t('home.title')}
        </TypographyText>
      </SpacingBox>
      <SpacingBox mb={3}>
        <SearchBox
          onSearch={handleOnSearch}
          placeholder={t('home.search_placeholder')}
          isSearching={isSearching && loading}
        />
      </SpacingBox>

      {hasError ? (
        <EmptyState iconName={IconName.Error} text={t('home.error')} iconTestID="errorImage" textTestID="errorTitle" />
      ) : (
        <ScrollList
          data={userList}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          fetchNextData={handleFetchNextUsers}
          refreshData={handleOnRefresh}
          isLoading={loading}
          ListEmptyComponent={<ListEmpty loading={!!loading} text={t('home.empty')} />}
          ListFooterComponent={<ListFooter loading={!!loading} elementsToDisplay={!userList?.length ? 5 : 1} />}
        />
      )}
    </SafeArea>
  );
};

export default HomeScreen;
