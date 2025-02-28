import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'db', 'user.json');

/**
 * Get all users
 * 
 * @returns 
 */
export const findAll = async () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const db = JSON.parse(data);

  return db.users;
};
