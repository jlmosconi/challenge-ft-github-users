import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {AppDispatch, RootState} from 'store';
import type {UsersState} from './types';
import type {IUserListResponse} from '@services/usersService/types';
import usersService from '@services/usersService';

const initialState: UsersState = {
  list: [],
  isFetching: false,
};

const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersStart: state => {
      state.isFetching = true;
    },
    getUsersSuccess: (state, {payload}: PayloadAction<IUserListResponse[]>) => {
      state.list = payload || [];
      state.isFetching = false;
    },
    getUsersFailed: state => {
      state.isFetching = false;
    },
  },
});

export const {getUsersStart, getUsersSuccess, getUsersFailed} = UsersSlice.actions;

export default UsersSlice.reducer;

/**
 * Thunks
 */

export const fetchUsers =
  ({since = 0, limit = 10} = {}) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const alreadyLoading = isFetching(getState());
    if (alreadyLoading) return;

    dispatch(getUsersStart());
    const response = await usersService.getUserList(since, limit);

    if (response.ok) {
      dispatch(getUsersSuccess(response.data!));
      return {success: true, data: response.data};
    }
    dispatch(getUsersFailed());
    return {success: false};
  };

/**
 * Selectors
 */
export const selectUsersList = (state: RootState) => state.users.list;
export const isFetching = (state: RootState) => state.users.isFetching;
