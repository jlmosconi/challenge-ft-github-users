import {api} from '@services/api';
import type {ErrorResponse} from '@services/api/types';
import type {IUserListResponse, IUserResponse} from './types';

const baseUrl = `/users`;

const getUserList = (since: number, limit: number) =>
  api.get<IUserListResponse[], ErrorResponse>(`${baseUrl}`, {
    per_page: limit,
    since,
  });

const getUserByName = (username: string) => api.get<IUserResponse, ErrorResponse>(`${baseUrl}/${username}`);

export default {
  getUserList,
  getUserByName,
};
