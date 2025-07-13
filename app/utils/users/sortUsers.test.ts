import {sortUsers} from './sortUsers';
import type {FavoriteUser} from '@store/slices/favorites/types';

describe('sortUsers', () => {
  const users: FavoriteUser[] = [
    {id: 2, login: 'charlie', avatar_url: 'url2'},
    {id: 3, login: 'brian', avatar_url: 'url3'},
    {id: 1, login: 'alex', avatar_url: 'url1'},
  ];

  it('should sort users by name ascending', () => {
    const result = sortUsers(users, 'name-asc');

    expect(result.map(u => u.login)).toEqual(['alex', 'brian', 'charlie']);
  });

  it('should sort users by name descending', () => {
    const result = sortUsers(users, 'name-desc');

    expect(result.map(u => u.login)).toEqual(['charlie', 'brian', 'alex']);
  });

  it('should sort users by id when sort option is id', () => {
    const result = sortUsers(users, 'id');

    expect(result.map(u => u.id)).toEqual([1, 2, 3]);
  });

  it('should return empty array if users array is empty', () => {
    const result = sortUsers([], 'name-asc');

    expect(result).toEqual([]);
  });

  it('should handle users with same login gracefully', () => {
    const usersWithDuplicates: FavoriteUser[] = [
      {id: 2, login: 'alex', avatar_url: 'url2'},
      {id: 3, login: 'alex', avatar_url: 'url3'},
    ];

    const result = sortUsers(usersWithDuplicates, 'name-asc');

    // Should keep stable order for same names
    expect(result.map(u => u.id)).toEqual([2, 3]);
  });
});
