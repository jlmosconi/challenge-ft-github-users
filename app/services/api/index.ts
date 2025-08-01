import {createApi, type BaseQueryFn} from '@reduxjs/toolkit/query/react';
import type {AxiosRequestConfig, AxiosError} from 'axios';
import {api} from './instance';

const customBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({url, method = 'GET', data, params, headers}) => {
    try {
      const result = await api.request({
        url,
        method,
        data,
        params,
        headers,
      });
      return {data: result.data};
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery(),
  tagTypes: ['UserList', 'UserSearch', 'UserDetail'],
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 300,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
