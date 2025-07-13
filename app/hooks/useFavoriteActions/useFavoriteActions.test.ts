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

const mockedUseAppDispatch = require('@store/hooks').useAppDispatch;
const mockedUseAppSelector = require('@store/hooks').useAppSelector;

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
    mockedUseAppSelector.mockImplementation((selectorFn: any) =>
      selectorFn({
        favorites: {
          list: favoritesList,
        },
      }),
    );
    mockedUseAppDispatch.mockReturnValue(jest.fn());

    const {result} = renderHook(() => useFavoriteActions());

    expect(result.current.isFavorite(333)).toBe(false);
  });

  it('should return true from isFavorite if user is in favorites', () => {
    mockedUseAppSelector.mockImplementation((selectorFn: any) =>
      selectorFn({
        favorites: {
          list: favoritesList,
        },
      }),
    );
    mockedUseAppDispatch.mockReturnValue(jest.fn());

    const {result} = renderHook(() => useFavoriteActions());

    expect(result.current.isFavorite(136)).toBe(true);
  });
});
