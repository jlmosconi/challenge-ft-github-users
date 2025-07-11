/**
 * Creates a screen stack using the keys of a specified type.
 *
 * @template T - Type representing the keys of the screens.
 * @template U - Custom value type for each screen (optional, default: {}).
 */
export type CreateScreenStack<T extends string, U = {}> = {
  [K in T]: K extends keyof U ? U[K] : undefined;
};
