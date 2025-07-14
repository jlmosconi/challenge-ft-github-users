import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {AppDispatch, RootState} from 'store';
import type {UsersState} from './types';
import type {IUserListResponse, IUserResponse} from '@services/usersService/types';
import usersService from '@services/usersService';
import searchService from '@services/searchService';

const initialState: UsersState = {
  list: [],
  user: undefined,
  isFetching: {
    list: false,
    user: false,
  },
  isSearching: false,
  hasError: {
    list: false,
    user: false,
  },
};

const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersStart: state => {
      state.isSearching = false;
      state.isFetching.list = true;
    },
    getUsersSuccess: (state, {payload}: PayloadAction<IUserListResponse[]>) => {
      state.list = payload || [];
      state.isFetching.list = false;
      state.hasError.list = false;
    },
    getUsersFailed: state => {
      state.isFetching.list = false;
      state.hasError.list = true;
    },
    searchUserStart: state => {
      state.isFetching.list = true;
      state.isSearching = true;
    },
    searchUserSuccess: (state, {payload}: PayloadAction<IUserListResponse[]>) => {
      state.list = payload || [];
      state.isFetching.list = false;
      state.hasError.list = false;
    },
    searchUserFailed: state => {
      state.isFetching.list = false;
      state.hasError.list = true;
    },
    getUserStart: state => {
      state.isFetching.user = true;
    },
    getUserSuccess: (state, {payload}: PayloadAction<IUserResponse>) => {
      state.user = payload;
      state.isFetching.user = false;
      state.hasError.user = false;
    },
    getUserFailed: state => {
      state.isFetching.user = false;
      state.hasError.user = true;
    },
    clearUserList: state => {
      state.list = [];
      state.isFetching.list = false;
      state.hasError.list = false;
    },
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailed,
  searchUserStart,
  searchUserSuccess,
  searchUserFailed,
  getUserStart,
  getUserSuccess,
  getUserFailed,
  clearUserList,
} = UsersSlice.actions;

export default UsersSlice.reducer;

/**
 * Thunks
 */

export const fetchUsers =
  ({since = 0, limit = 15} = {}) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const alreadyLoading = selectIsFetchingList(getState());
    if (alreadyLoading) return;

    dispatch(getUsersStart());
    const response = await usersService.getUserList(since, limit);
    if (__DEV__) {
      console.log('fetchUsers', response);
    }

    if (response.ok) {
      const list = selectUsersList(getState());
      const data = [...list, ...(response.data || [])];
      dispatch(getUsersSuccess(data));
      return {success: true, data};
    }
    dispatch(getUsersFailed());
    return {success: false};
  };

export const fetchNextUsers = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const searching = selectIsSearching(getState());
  const hasError = selectHasErrorList(getState());
  if (searching || hasError) return;

  const list = selectUsersList(getState()) || [];
  const lastUserId = list[list.length - 1]?.id || 0;
  return dispatch(fetchUsers({since: lastUserId}));
};

export const reloadUsers = () => async (dispatch: AppDispatch) => {
  dispatch(clearUserList());
  return dispatch(fetchUsers());
};

export const fetchSearchUsers =
  ({query = '', limit = 15} = {}) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const alreadyLoading = selectIsFetchingList(getState());
    if (alreadyLoading) return;
    dispatch(searchUserStart());

    const response = await searchService.searchUsers(query, limit);
    if (__DEV__) {
      console.log('fetchSearchUsers', response);
    }

    if (response.ok) {
      dispatch(searchUserSuccess(response.data?.items || []));
      return {success: true, data: response.data};
    }
    dispatch(searchUserFailed());
    return {success: false};
  };

export const fetchUser = (username: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const alreadyLoading = selectIsFetchingUser(getState());
  if (alreadyLoading) return;

  dispatch(getUserStart());
  const response = await usersService.getUserByName(username);
  if (__DEV__) {
    console.log('fetchUser', response);
  }

  if (response.ok) {
    dispatch(getUserSuccess(response.data!));
    return {success: true, data: response.data};
  }
  dispatch(getUserFailed());
  return {success: false};
};

/**
 * Selectors
 */
export const selectUsersList = (state: RootState) => state.users.list;
export const selectUser = (state: RootState) => state.users.user;
export const selectIsFetchingList = (state: RootState) => state.users.isFetching.list;
export const selectIsFetchingUser = (state: RootState) => state.users.isFetching.user;
export const selectIsSearching = (state: RootState) => state.users.isSearching;
export const selectHasErrorList = (state: RootState) => state.users.hasError.list;
export const selectHasErrorUser = (state: RootState) => state.users.hasError.user;
