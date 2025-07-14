import {api} from '@services/api';
import CONFIG from '@config/environment/current';
import type {ErrorResponse} from '@services/api/types';
import type {IUserSearchResponse} from './types';

const baseUrl = `${CONFIG.API.BASE_URL}/search`;

const searchUsers = (query: string, limit = 10) =>
  api.get<IUserSearchResponse, ErrorResponse>(`${baseUrl}/users`, {q: query, per_page: limit});

export default {
  searchUsers,
};
