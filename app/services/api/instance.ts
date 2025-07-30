import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type CancelTokenSource,
  type InternalAxiosRequestConfig,
} from 'axios';
import CONFIG from '@config/environment/current';

const api: AxiosInstance = axios.create({
  baseURL: CONFIG.API.BASE_URL,
});

const cancelTokenSources: Map<string, CancelTokenSource> = new Map();

const getKey = (url: string, dataOrParams?: any): string => {
  if (!dataOrParams) return url;
  const paramsString = JSON.stringify(dataOrParams);
  return `${url}/${paramsString}`;
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const key = getKey(config.url || '', config.params || config.data);
  console.log('Request key:', key);
  if (cancelTokenSources.has(key)) {
    cancelTokenSources.get(key)?.cancel('Duplicated request canceled');
  }

  const source = axios.CancelToken.source();
  cancelTokenSources.set(key, source);
  config.cancelToken = source.token;

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    const key = getKey(response.config.url || '', response.config.params || response.config.data);
    cancelTokenSources.delete(key);
    return response;
  },
  error => {
    const key = getKey(error.config?.url || '', error.config?.params || error.config?.data);
    cancelTokenSources.delete(key);

    if (axios.isCancel(error)) {
      console.warn('Request cancelled:', error.message);
    }

    if (error.response?.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
    }

    return Promise.reject(error);
  },
);

export {api};
