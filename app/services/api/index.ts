import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import CONFIG from '@config/environment/current';
import type {BaseQueryFn, FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/query';

const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: CONFIG.API.BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as any)?.auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  // Manejo global de errores
  if (result?.error?.status === 401) {
    // signOut(); // o dispatch(logout()), etc.
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['UserList', 'UserSearch', 'UserDetail'],
  endpoints: () => ({}),
});
