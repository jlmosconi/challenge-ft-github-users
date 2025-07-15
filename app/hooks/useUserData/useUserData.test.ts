import {renderHook} from '@testing-library/react-hooks';
import {useUserData} from '.';
import {fetchUser, selectUser, selectIsFetchingUser, selectHasErrorUser} from '@store/slices/users';
import type {IUserResponse} from '@services/usersService/types';

const mockUser: IUserResponse = {
  login: 'jlmosconi',
  id: 123,
  node_id: 'abc123',
  avatar_url: 'http://example.com/avatar.png',
  gravatar_id: '',
  url: 'http://example.com',
  html_url: 'http://example.com',
  followers_url: 'http://example.com',
  following_url: 'http://example.com',
  gists_url: 'http://example.com',
  starred_url: 'http://example.com',
  subscriptions_url: 'http://example.com',
  organizations_url: 'http://example.com',
  repos_url: 'http://example.com',
  events_url: 'http://example.com',
  received_events_url: 'http://example.com',
  type: 'User',
  user_view_type: 'basic',
  site_admin: false,
  name: 'My User',
  company: 'Example Corp',
  blog: 'http://blog.example.com',
  location: 'Buenos Aires',
  email: 'user@example.com',
  hireable: true,
  bio: 'This is a mock bio.',
  twitter_username: 'mockuser',
  public_repos: 10,
  public_gists: 2,
  followers: 50,
  following: 5,
  created_at: '2020-01-01T00:00:00Z',
  updated_at: '2021-01-01T00:00:00Z',
};

jest.mock('@store/slices/users', () => ({
  fetchUser: jest.fn((username: string) => ({
    type: 'users/fetchUser',
    payload: username,
  })),
  selectUser: jest.fn(),
  selectIsFetchingUser: jest.fn(),
  selectHasErrorUser: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockUseAppSelector = jest.fn();

jest.mock('@store/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (fn: (state: any) => any) => mockUseAppSelector(fn),
}));

describe('useUserData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupSelectors = ({
    user = null,
    isFetching = false,
    hasError = false,
  }: {
    user?: IUserResponse | {login: string} | null;
    isFetching?: boolean;
    hasError?: boolean;
  } = {}) => {
    mockUseAppSelector.mockImplementation(selector => {
      if (selector === selectUser) return user;
      if (selector === selectIsFetchingUser) return isFetching;
      if (selector === selectHasErrorUser) return hasError;
    });
  };

  it('should not dispatch fetchUser if username is empty', () => {
    setupSelectors();

    renderHook(() => useUserData(''));

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should not dispatch fetchUser if user is already loaded', () => {
    setupSelectors({user: {login: 'existingUser'}});

    renderHook(() => useUserData('existingUser'));

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should dispatch fetchUser if username differs from loaded user', () => {
    setupSelectors({user: {login: 'oldUser'}});

    renderHook(() => useUserData('newUser'));

    expect(fetchUser).toHaveBeenCalledWith('newUser');
    expect(mockDispatch).toHaveBeenCalledWith(fetchUser('newUser'));
  });

  it('should return user data from selectors', () => {
    setupSelectors({
      user: mockUser,
      isFetching: true,
      hasError: true,
    });

    const {result} = renderHook(() => useUserData('jlmosconi'));

    expect(result.current).toEqual({
      user: mockUser,
      isFetching: true,
      hasError: true,
    });
  });
});
