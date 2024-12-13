import express from 'express';
import pg from 'pg';
import cors from 'cors';

const app = express();
const PORT = 3001;
app.use(cors());

const databaseURL =
  'postgres://emjzlloo:KXquwbCINBQ8ukluBBuID_r8ujrej1F6@lallah.db.elephantsql.com/emjzlloo';

const { Pool } = pg;
const pool = new Pool({
  connectionString: databaseURL,
});

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
    console.error('Error fetching users:', error);
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
    console.error('Error fetching admin settings:', error);
    res.status(500).json({ error: 'ERROR: Failed to fetch admin settings' });
  }
});

app.post('/api/submituser', express.json(), async (req, res) => {
  try {
    const { email, password, aboutMe, birthday, address } = req.body;
    const client = await pool.connect();
    const query = `
      INSERT INTO user_data (email_address, password, about_me, birthday, address_street, address_city, address_state, address_zipcode, address_country)
        VALUES ('${email}', crypt('${password}', gen_salt('bf', 10)), '${aboutMe}', '${birthday}', '${address.street}', '${address.city}', '${address.state}', '${address.zip}', '${address.country}')
        RETURNING id;
    `;

    const result = await client.query(query);
    const newUserId = result.rows[0].id;

    client.release();
    res
      .status(201)
      .json({ message: 'User created successfully', id: newUserId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
