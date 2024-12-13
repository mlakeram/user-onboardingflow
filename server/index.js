import express from 'express';
import pg from 'pg';
// import fs from 'fs';

const app = express();
const PORT = 3001;

const databaseURL = '';

const { Pool } = pg;
const pool = new Pool({
  connectionString: databaseURL,
});

app.get('/api', (req, res) => {
  res.send('Response from express server');
});

// let tempdbdata = '';

// fs.readFile('./server/tempdatabase.json', (err, data) => {
//   if (err) {
//     console.error('Error reading file:', err);
//   } else {
//     console.log('File content (string):', data.toString());
//     tempdbdata = data.toString();
//   }
// });

app.get('/api/allusers', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM user_data');
    const users = result.rows;
    client.release();
    res.status(200).json(users);
    // res.send(tempdbdata);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'ERROR: Failed to fetch users' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
