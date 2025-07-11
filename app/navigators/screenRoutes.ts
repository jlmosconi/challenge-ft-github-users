import type {CreateScreenStack} from '@utils/screens';

export enum MainScreen {
  Home = 'Home',
  UserProfile = 'UserProfile',
  Favorites = 'Favorites',
  Configuration = 'Configuration',
}

export type MainStack = CreateScreenStack<MainScreen>;
