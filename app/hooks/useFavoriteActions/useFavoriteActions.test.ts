import {renderHook} from '@testing-library/react-hooks';
import {useFavoriteActions} from '../useFavoriteActions';

// Mocks
jest.mock('@store/slices/favorites', () => ({
  selectFavorites: jest.fn(state => state.favorites.list),
  toggleFavorite: jest.fn().mockImplementation(user => ({
    type: 'favorites/toggleFavorite',
    payload: user,
  })),
}));

const mockedUseAppSelector = require('@store/hooks').useAppSelector;

// Fake list of favorite users for mock store
const favoritesList = {
  136: {
    id: 136,
    login: 'test-user',
    avatar_url: 'http://example.com/avatar.png',
  },
};

describe('useFavoriteActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return false from isFavorite if user is not in favorites', () => {
    // Mock useAppSelector to return favoritesList
    mockedUseAppSelector.mockImplementation((selectorFn: any) =>
      selectorFn({
        favorites: {
          list: favoritesList,
        },
      }),
    );

    const {result} = renderHook(() => useFavoriteActions());

    expect(result.current.isFavorite(333)).toBe(false);
  });

  it('should return true from isFavorite if user is in favorites', () => {
    // Mock useAppSelector to return favoritesList
    mockedUseAppSelector.mockImplementation((selectorFn: any) =>
      selectorFn({
        favorites: {
          list: favoritesList,
        },
      }),
    );

    const {result} = renderHook(() => useFavoriteActions());

    expect(result.current.isFavorite(136)).toBe(true);
  });
});
