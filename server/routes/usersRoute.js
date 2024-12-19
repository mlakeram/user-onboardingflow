import express from 'express';
import getUserData from '../controllers/getUserData.js';
import createUser from '../controllers/createUser.js';

const router = express.Router();

router.get('/allusers', getUserData);
router.post('/user', express.json(), createUser);

export default router;
