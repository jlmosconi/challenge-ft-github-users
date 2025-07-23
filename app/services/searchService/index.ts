import {api} from '@services/api';
import type {ErrorResponse} from '@services/api/types';
import type {IUserSearchResponse} from './types';

const baseUrl = `/search`;

const searchUsers = (query: string, limit = 10) =>
  api.get<IUserSearchResponse, ErrorResponse>(`${baseUrl}/users`, {q: query, per_page: limit});

export default {
  searchUsers,
};
