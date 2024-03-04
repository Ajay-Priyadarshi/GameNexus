// routes/userAnalyticsRoutes.js
import express from 'express';
import { showanalytics, userList, deleteUser, activateUser, genderRatio, ageRatio } from '../controllers/userAnalyticsController.js';

const router = express.Router();

router.get('/', showanalytics);

router.get('/userList', userList);
router.get('/delete/:userId', deleteUser);
router.get('/activate/:userId', activateUser);

router.get('/genderRatio', genderRatio);
router.get('/ageRatio', ageRatio);

export default router;
