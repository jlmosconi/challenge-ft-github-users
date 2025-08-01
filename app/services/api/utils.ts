import type {QueryDefinition, MutationDefinition, StartQueryActionCreatorOptions} from '@reduxjs/toolkit/query';
import {store} from '@store/index';

type ValidEndpoint = QueryDefinition<any, any, any, any> | MutationDefinition<any, any, any, any>;

type ExtractArgs<T> = T extends QueryDefinition<infer A, any, any, any>
  ? A
  : T extends MutationDefinition<infer A, any, any, any>
  ? A
  : never;

type ExtractResult<T> = T extends QueryDefinition<any, any, any, infer R>
  ? R
  : T extends MutationDefinition<any, any, any, infer R>
  ? R
  : never;

interface ExecuteQueryOptions<E extends ValidEndpoint> {
  endpoint: {
    initiate: (args?: ExtractArgs<E>, options?: StartQueryActionCreatorOptions) => any;
  };
  args?: ExtractArgs<E>;
  options?: StartQueryActionCreatorOptions;
  onSuccess?: (result: ExtractResult<E>) => void;
  onError?: (error: unknown) => void;
  invalidateTags?: () => any;
}

export const executeQuery = async <E extends ValidEndpoint>({
  endpoint,
  args,
  options,
  onSuccess,
  onError,
  invalidateTags,
}: ExecuteQueryOptions<E>): Promise<{
  success: boolean;
  data?: ExtractResult<E>;
  error?: unknown;
}> => {
  try {
    const result = await store.dispatch(endpoint.initiate(args, options)).unwrap();

    onSuccess?.(result);

    if (invalidateTags) {
      store.dispatch(invalidateTags());
    }

    return {success: true, data: result};
  } catch (error) {
    onError?.(error);
    return {success: false, error};
  }
};
