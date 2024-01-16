// profileRoutes.js
import express from 'express';
import { showProfile } from '../controllers/profileController.js';

const router = express.Router();

// Add middleware or authentication checks if necessary
router.get('/', showProfile);

export default router;
