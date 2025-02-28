import { findAll } from '../models/user.model';

/**
 * 
 * @returns 
 */
export const getUsers = async () => {
  return await findAll();
};
