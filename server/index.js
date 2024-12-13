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

app.post('/api/submituser', express.json(), async (req, res) => {
  console.log('post received');
  console.log(req.body);
  res.send('User saved');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
