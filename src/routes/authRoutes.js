// authRoutes.js
import express from 'express';
import { login, register, selectPlan, forgotPasswordStep1, forgotPasswordStep2 } from "../controllers/authController.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.join(__dirname, '../../uploads/profileImages'));
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get('/reg', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', '../../../static/register.html'));
})
router.post('/register', upload.single('photo'), register);
router.post('/select-plan', selectPlan);

router.post('/login', login);
router.post('/forgot-password-step1', forgotPasswordStep1);
router.post('/forgot-password-step2', forgotPasswordStep2);

export default router;
