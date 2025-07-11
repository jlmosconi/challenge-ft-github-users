import {api} from '@services/api';
import CONFIG from '@config/environment/current';
import type {ErrorResponse} from '@services/api/types';
import type {IUserListResponse, IUserResponse} from './types';

const baseUrl = `${CONFIG.API.BASE_URL}/users`;

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
