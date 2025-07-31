import {executeQuery} from '@services/api/utils';
import {usersApi} from './api';

const getUserList = (since: number, limit: number) =>
  executeQuery({
    endpoint: usersApi.endpoints.getUserList,
    args: {since, limit},
  });

const getUserByName = (username: string) =>
  executeQuery({
    endpoint: usersApi.endpoints.getUserByName,
    args: username,
  });

export const usersService = {
  getUserList,
  getUserByName,
};
