// profileRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { showProfile, editProfile, updateProfile } from '../controllers/profileController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null,path.join(__dirname, '../../uploads/profileImages'));
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const router = express.Router();

// Add middleware or authentication checks if necessary
router.get('/', showProfile);

router.get('/edit', editProfile);

router.post('/update', upload.single('userPhoto'), updateProfile);

router.get('/profile_options', (req, res) => {
    res.render('profile_options'); 
});

export default router;
