// import {api} from '@services/api';
// import type {ErrorResponse} from '@services/api/types';
// import type {IUserListResponse, IUserResponse} from './types';

// const baseUrl = `/users`;

// const getUserList = (since: number, limit: number) =>
//   api.get<IUserListResponse[], ErrorResponse>(`${baseUrl}`, {
//     per_page: limit,
//     since,
//   });

// const getUserByName = (username: string) => api.get<IUserResponse, ErrorResponse>(`${baseUrl}/${username}`);

// export default {
//   getUserList,
//   getUserByName,
// };

const baseUrl = `/users`;
import {baseApi} from '@services/api';
import type {IUserListResponse, IUserResponse} from './types';

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserList: builder.query<IUserListResponse[], {since: number; limit: number}>({
      query: ({since, limit}) => ({
        url: `${baseUrl}`,
        params: {since, per_page: limit},
      }),
      providesTags: (_result, _error, {since}) => [{type: 'UserList', id: since}],
    }),
    getUserByName: builder.query<IUserResponse, string>({
      query: username => `${baseUrl}/${username}`,
      providesTags: (_result, _error, username) => [{type: 'UserDetail', id: username}],
    }),
  }),
  overrideExisting: false,
});

export const {useGetUserListQuery, useGetUserByNameQuery, useLazyGetUserListQuery, useLazyGetUserByNameQuery} =
  usersApi;
