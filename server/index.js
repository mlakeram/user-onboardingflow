import express from 'express';
import pg from 'pg';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-undef
const environment = process.env.NODE_ENV || 'development';

if (environment === 'development') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  dotenv.config({
    path: path.resolve(__dirname, '../.env.development'),
  });
}

const app = express();
const PORT = 3001;
app.use(cors());

// eslint-disable-next-line no-undef
const DATABASE_URL = process.env.DATABASE_URL;

const { Pool } = pg;
const pool = new Pool({
  connectionString: DATABASE_URL,
});

// app.use(express.static(path.join(path.dirname('./dist'), 'dist')));

app.get('/api', (req, res) => {
  res.send('Response from express server');
});

app.get('/api/data', async (req, res) => {
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
});

app.get('/api/adminsettings', async (req, res) => {
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
});

app.post('/api/adminsettings', express.json(), async (req, res) => {
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
});

app.post('/api/user', express.json(), async (req, res) => {
  try {
    const { email, password, aboutMe, birthday, address } = req.body;
    const client = await pool.connect();
    const query = `
      INSERT INTO user_data (email_address, password, about_me, birthday, address_street, address_city, address_state, address_zipcode, address_country)
        VALUES ('${email}', crypt('${password}', gen_salt('bf', 10)), '${aboutMe}', '${birthday}', '${address.street}', '${address.city}', '${address.state}', '${address.zip}', '${address.country}')
        ON CONFLICT (email_address) DO NOTHING;
        `;

    client.query(query);

    client.release();
    res.status(201).json({ message: 'User created successfully' });
    console.log('User save succesfully');
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(path.dirname('./dist'), 'dist', 'index.html'), {
//     root: path.dirname('./dist'),
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
