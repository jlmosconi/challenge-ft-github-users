import {searchApi} from './api';
import {executeQuery} from '@services/api/utils';

export const getSearchUsers = (query: string, limit: number = 10) =>
  executeQuery({
    endpoint: searchApi.endpoints.searchUsers,
    args: {query, limit},
  });

export const searchService = {
  getSearchUsers,
};
