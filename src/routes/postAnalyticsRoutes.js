// routes/userAnalyticsRoutes.js
import express from 'express';
import { showanalytics, user ,post } from '../controllers/postAnalyticsController.js';

const router = express.Router();

router.get('/', showanalytics);

router.get('/user/:username', user);

router.get('/post', post);

export default router;
