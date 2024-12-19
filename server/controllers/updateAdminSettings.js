import { pool } from '../utils/dBConfig.js';

export default async function updateAdminSettings(req, res) {
  try {
    const { birthdayPage, aboutMePage, addressPage } = req.body;
    const client = await pool.connect();
    const query = `
        UPDATE admin_settings
        SET page = CASE component
          WHEN 'birthday' THEN ${birthdayPage}
          WHEN 'aboutMe' THEN ${aboutMePage}
          WHEN 'address' THEN ${addressPage}
          END
        WHERE component IN ('birthday', 'aboutMe', 'address');
        `;

    await client.query(query);

    client.release();
    res.status(201).json({ message: 'Settings updated' });
    console.log('Settings succesfully updated');
  } catch (error) {
    console.error('Error saving settings:', error.message);
    res.status(500).json({ error: 'Failed to save settings' });
  }
}
