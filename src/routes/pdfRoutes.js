// pdfRoutes.js
import express from 'express';
import { userAnalytics, ageAnalytics, genderAnalytics, postAnalytics, postUserAnalytics, salesAnalytics } from '../controllers/pdfController.js';

const router = express.Router();

router.get('/userAnalytics', userAnalytics);
// router.get('/downloadUserAnalytics', (req, res) => {
//     Send the PDF file in the response
//     res.download('pdf/UserAnalyticsReport.pdf');
// });
router.get('/ageAnalytics', ageAnalytics);
router.get('/genderAnalytics', genderAnalytics);
router.get('/postAnalytics', postAnalytics);
router.get('/postUserAnalytics', postUserAnalytics);
router.get('/salesAnalytics', salesAnalytics);

export default router;
