// routes/userAnalyticsRoutes.js
import express from 'express';
import { showanalytics, userList, deleteUser, activateUser } from '../controllers/userAnalyticsController.js';

const router = express.Router();

router.get('/', showanalytics);
router.get('/userList', userList);
router.get('/delete/:userId', deleteUser);
router.get('/activate/:userId', activateUser);

export default router;
