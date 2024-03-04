// routes/userAnalyticsRoutes.js
import express from 'express';
import { showanalytics, userList } from '../controllers/postAnalyticsController.js';

const router = express.Router();

router.get('/', showanalytics);

router.get('/userList', userList);



export default router;
