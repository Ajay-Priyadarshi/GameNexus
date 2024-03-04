// pdfRoutes.js
import express from 'express';
import { userAnalytics } from '../controllers/pdfController.js';

const router = express.Router();

router.get('/userAnalytics', userAnalytics);

export default router;
