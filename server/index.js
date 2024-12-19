import express from 'express';
import cors from 'cors';
import adminSettingsRoutes from './routes/adminSettingsRoute.js';
import usersRoutes from './routes/usersRoute.js';

const app = express();
const PORT = 3001;
app.use(cors());

app.get('/api', (req, res) => res.send('Response from server'));

app.use('/api/users', usersRoutes);

app.use('/api/adminsettings', adminSettingsRoutes);

app.get('*', (req, res) => res.send('Route does not exist'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
