import express from 'express';
import pg from 'pg';
import cors from 'cors';

const app = express();
const PORT = 3001;
app.use(cors());

const databaseURL = '';

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
