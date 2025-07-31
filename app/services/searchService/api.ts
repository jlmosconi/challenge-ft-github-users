import {baseApi} from '@services/api';
import type {IUserSearchItem, IUserSearchResponse} from './types';

const baseUrl = `/search`;

export const searchApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    searchUsers: builder.query<IUserSearchItem[], {query: string; limit?: number}>({
      query: ({query, limit = 10}) => ({
        url: `${baseUrl}/users`,
        params: {q: query, per_page: limit},
      }),
      transformResponse: (response: IUserSearchResponse) => response.items,
      providesTags: (_result, _error, {query}) => [{type: 'UserSearch', id: query}],
    }),
  }),
  overrideExisting: false,
});

export const {useSearchUsersQuery, useLazySearchUsersQuery} = searchApi;
