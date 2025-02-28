import { getUsers } from '../services/user.service';
import { findAll } from '../models/user.model';

jest.mock('../models/user.model');

describe('User Service', () => {
  it('should return a list of users', async () => {
    const mockUsers = [{ id: 1, name: 'Piseth' }];

    (findAll as jest.Mock).mockResolvedValue(mockUsers);
    const users = await getUsers();

    expect(users).toEqual(mockUsers);
  });
});
