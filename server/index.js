import express from 'express';
const app = express();
const PORT = 3001;

app.get('/api', (req, res) => {
  res.send('Response from express server');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
