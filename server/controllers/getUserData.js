import { pool } from '../utils/dBConfig.js';

export default async function getUserData(req, res) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM user_data');
    const users = result.rows;
    client.release();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'ERROR: Failed to fetch users' });
  }
}
