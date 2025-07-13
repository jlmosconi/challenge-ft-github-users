/**
 * Creates a screen stack using the keys of a specified type.
 *
 * @template T - Type representing the keys of the screens.
 * @template U - Custom value type for each screen (optional, default: {}).
 *
 * @example
 * // Define screen names
 * export enum MainScreen {
 *   Home = 'Home',
 *   User = 'User',
 * }
 *
 * // Define parameters for specific screens
 * export type MainStack = CreateScreenStack<
 *   MainScreen,
 *   {
 *     [MainScreen.User]: {
 *       userId: number;
 *     };
 *   }
 * >;
 *
 * // Resulting MainStack type:
 * // {
 * //   Home: undefined;
 * //   User: { userId: number };
 * // }
 */
export type CreateScreenStack<T extends string, U = {}> = {
  [K in T]: K extends keyof U ? U[K] : undefined;
};
