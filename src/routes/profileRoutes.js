// profileRoutes.js
import express from 'express';
import { showProfile } from '../controllers/profileController.js';

const router = express.Router();

// Add middleware or authentication checks if necessary
router.get('/', showProfile);

router.get('/profile_options', (req, res) => {
    res.render('profile_options'); // Render profile_options.ejs
});


export default router;
