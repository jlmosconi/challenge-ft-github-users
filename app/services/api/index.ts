import {create} from 'apisauce';
import axios, {type CancelTokenSource} from 'axios';
import CONFIG from '@config/environment/current';

// Create the API instance
const api = create({
  baseURL: CONFIG.API.BASE_URL,
});

// Store CancelTokenSources to manage duplicate requests
const cancelTokenSources: Map<string, CancelTokenSource> = new Map();

// Generate a unique key for each request based on URL + params/data
const getKey = (url: string, dataOrParams?: any): string => {
  if (!dataOrParams) return url;
  const paramsString = JSON.stringify(dataOrParams);
  return `${url}/${paramsString}`;
};

// Add request transform to handle cancel tokens
api.addRequestTransform(request => {
  request.headers = request.headers || {};

  const key = getKey(request.url || '', request.data || request.params);

  // Cancel any existing identical request
  if (cancelTokenSources.has(key)) {
    const source = cancelTokenSources.get(key);
    source?.cancel();
  }

  // Create a new CancelToken for this request
  const cancelTokenSource = axios.CancelToken.source();
  cancelTokenSources.set(key, cancelTokenSource);
  request.cancelToken = cancelTokenSource.token;
});

// Remove token after response completes
api.addResponseTransform(response => {
  response.config = response.config || {};
  const key = getKey(response.config.url || '', response.config.data);

  if (cancelTokenSources.has(key)) {
    cancelTokenSources.delete(key);
  }
});

export {api};
