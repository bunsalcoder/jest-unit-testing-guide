import { Request, Response } from 'express';
import { getUsers } from '../services/user.service';

/**
 * Get all users
 * 
 * @param { Request } req - the request object
 * @param { Response } res - the response object
 * @returns { Promise<any> } - a promise that resolve to the retrieved users
 */
export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await getUsers();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};
