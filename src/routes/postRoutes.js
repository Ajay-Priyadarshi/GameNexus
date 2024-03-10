import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { newPost, createPost, deletePost } from '../controllers/postController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.join(__dirname, '../../uploads/posts'));
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage }).single('userPhoto');

const router = express.Router();

router.get('/new', newPost);
router.post('/create', upload, createPost);
router.get('/delete/:postId', deletePost);

export default router;
