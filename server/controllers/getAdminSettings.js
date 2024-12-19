import { pool } from '../utils/dBConfig.js';

export default async function getAdminSettings(req, res) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM admin_settings');
    const settings = result.rows;
    client.release();
    res.status(200).json(settings);
  } catch (error) {
    console.error('Error fetching admin settings:', error.message);
    res.status(500).json({ error: 'ERROR: Failed to fetch admin settings' });
  }
}
