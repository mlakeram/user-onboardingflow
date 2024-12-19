import express from 'express';
import getAdminSettings from '../controllers/getAdminSettings.js';
import updateAdminSettings from '../controllers/updateAdminSettings.js';

const router = express.Router();

router.get('/', getAdminSettings);
router.post('/', express.json(), updateAdminSettings);

export default router;
