import express from 'express';
import { showanalytics } from '../controllers/userAnalyticsController.js';

const router = express.Router();

router.get('/', showanalytics);

export default router;