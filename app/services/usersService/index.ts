import {api} from '@services/api';
import CONFIG from '@config/environment/current';
import type {ErrorResponse} from '@services/api/types';
import type {IUserListResponse, IUserResponse} from './types';

const baseUrl = `${CONFIG.API.BASE_URL}/users`;

const getUserList = (limit = 10) =>
  api.get<IUserListResponse[], ErrorResponse>(`${baseUrl}`, {
    params: {per_page: limit},
  });

const getUserByName = (username: string) => api.get<IUserResponse, ErrorResponse>(`${baseUrl}/${username}`);

export default {
  getUserList,
  getUserByName,
};
