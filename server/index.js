import express from 'express';
import cors from 'cors';
import getUserData from './controllers/getUserData.js';
import createUser from './controllers/createUser.js';
import getAdminSettings from './controllers/getAdminSettings.js';
import updateAdminSettings from './controllers/updateAdminSettings.js';

const app = express();
const PORT = 3001;
app.use(cors());

app.get('/api', (req, res) => res.send('Response from server'));

app.get('/api/data', getUserData);

app.get('/api/adminsettings', getAdminSettings);

app.post('/api/user', express.json(), createUser);

app.post('/api/adminsettings', express.json(), updateAdminSettings);

app.get('*', (req, res) => res.send('Route does not exist'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
