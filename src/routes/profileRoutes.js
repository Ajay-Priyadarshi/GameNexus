import express from 'express';
import { showProfile, editProfile, updateProfile } from '../controllers/profileController.js';

const router = express.Router();

// Add middleware or authentication checks if necessary
router.get('/', showProfile);

// Route to render the edit profile form
router.get('/editProfile', editProfile);

// Route to handle the profile update form submission
router.post('/updateProfile', updateProfile);

router.get('/profile_options', (req, res) => {
    res.render('profile_options'); // Render profile_options.ejs
});

export default router;
