import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {AppDispatch, RootState} from 'store';
import type {UsersState} from './types';
import type {IUserListResponse} from '@services/usersService/types';
import usersService from '@services/usersService';
import searchService from '@services/searchService';

const initialState: UsersState = {
  list: [],
  isFetching: false,
  isSearching: false,
};

const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersStart: state => {
      state.isSearching = false;
      state.isFetching = true;
    },
    getUsersSuccess: (state, {payload}: PayloadAction<IUserListResponse[]>) => {
      state.list = payload || [];
      state.isFetching = false;
    },
    getUsersFailed: state => {
      state.isFetching = false;
    },
    searchUserStart: state => {
      state.isFetching = true;
      state.isSearching = true;
    },
    searchUserSuccess: (state, {payload}: PayloadAction<IUserListResponse[]>) => {
      state.list = payload || [];
      state.isFetching = false;
    },
    searchUserFailed: state => {
      state.isFetching = false;
    },
    clearUserList: state => {
      state.list = [];
      state.isFetching = false;
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
  clearUserList,
} = UsersSlice.actions;

export default UsersSlice.reducer;

/**
 * Thunks
 */

export const fetchUsers =
  ({since = 0, limit = 15} = {}) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const alreadyLoading = selectIsFetching(getState());
    if (alreadyLoading) return;

    dispatch(getUsersStart());
    const response = await usersService.getUserList(since, limit);

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
  if (searching) return;

  const list = selectUsersList(getState()) || [];
  const lastUserId = list[list.length - 1]?.id || 0;
  return dispatch(fetchUsers({since: lastUserId}));
};

export const reloadUsers = () => async (dispatch: AppDispatch) => {
  dispatch(clearUserList());
  return dispatch(fetchUsers());
};

export const fetchSearchUsers =
  ({query = '', limit = 10} = {}) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const alreadyLoading = selectIsFetching(getState());
    if (alreadyLoading) return;
    dispatch(searchUserStart());

    const response = await searchService.searchUsers(query, limit);

    if (response.ok) {
      dispatch(searchUserSuccess(response.data?.items || []));
      return {success: true, data: response.data};
    }
    dispatch(searchUserFailed());
    return {success: false};
  };

/**
 * Selectors
 */
export const selectUsersList = (state: RootState) => state.users.list;
export const selectIsFetching = (state: RootState) => state.users.isFetching;
export const selectIsSearching = (state: RootState) => state.users.isSearching;
