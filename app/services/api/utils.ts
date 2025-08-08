import type {
  ApiEndpointQuery,
  ApiEndpointMutation,
  QueryDefinition,
  MutationDefinition,
  StartQueryActionCreatorOptions,
} from '@reduxjs/toolkit/query';
import {store, type AppDispatch} from '@store/index';

type DefOf<E> = E extends ApiEndpointQuery<infer D, any> ? D : E extends ApiEndpointMutation<infer D, any> ? D : never;

type ArgsOf<D> = D extends QueryDefinition<infer A, any, any, any>
  ? A
  : D extends MutationDefinition<infer A, any, any, any>
  ? A
  : never;

type ResultOf<D> = D extends QueryDefinition<any, any, any, infer R>
  ? R
  : D extends MutationDefinition<any, any, any, infer R>
  ? R
  : never;

type AnyEndpoint =
  | ApiEndpointQuery<QueryDefinition<any, any, any, any>, any>
  | ApiEndpointMutation<MutationDefinition<any, any, any, any>, any>;

interface ExecuteQueryOptions<E extends AnyEndpoint> {
  endpoint: E;
  args?: ArgsOf<DefOf<E>>;
  options?: StartQueryActionCreatorOptions;
  onSuccess?: (result: ResultOf<DefOf<E>>) => void;
  onError?: (error: unknown) => void;
  invalidateTags?: () => any;
  dispatch?: AppDispatch; // optional, for testing or custom dispatching
}

export async function executeQuery<E extends AnyEndpoint>({
  endpoint,
  args,
  options,
  onSuccess,
  onError,
  invalidateTags,
  dispatch = store.dispatch as AppDispatch,
}: ExecuteQueryOptions<E>): Promise<{success: true; data: ResultOf<DefOf<E>>} | {success: false; error: unknown}> {
  try {
    const thunk = endpoint.initiate(args, options);
    const result = await (dispatch as any)(thunk).unwrap();

    onSuccess?.(result);
    if (invalidateTags) dispatch(invalidateTags());

    return {success: true, data: result};
  } catch (error) {
    onError?.(error);
    return {success: false, data: null, error};
  }
}
