import type {CreateScreenStack} from '@utils/screens';

export enum MainScreen {
  Home = 'Home',
  User = 'User',
  Favorites = 'Favorites',
  Configuration = 'Configuration',
}

export type MainStack = CreateScreenStack<MainScreen>;
