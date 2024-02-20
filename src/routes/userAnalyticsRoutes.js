// routes/userAnalyticsRoutes.js
import express from 'express';
import { showanalytics, userList, deleteUser } from '../controllers/userAnalyticsController.js';

const router = express.Router();

router.get('/', showanalytics);
router.get('/userList', userList);
router.get('/delete/:userId', deleteUser);

export default router;
