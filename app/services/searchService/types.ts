import type {IUserBase} from '@services/usersService/types';

export interface IUserSearchItem extends IUserBase {
  score: number;
}

export interface IUserSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: IUserSearchItem[];
}
