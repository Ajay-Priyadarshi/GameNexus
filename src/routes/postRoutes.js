import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
 import { newPost,createPost } from '../controllers/postController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null,path.join(__dirname, '../../uploads/posts'));
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const router = express.Router();
const upload = multer({ storage });

router.get('/new', newPost);

router.post('/create', upload.single('userPhoto'), createPost);


export default router;