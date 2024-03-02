import express from 'express';
import { allChats, personalChats, sendMessage } from '../controllers/chatController.js';

const router = express.Router();

router.get('/', allChats);
router.get('/personal/:userId', personalChats);
router.post('/send', sendMessage);

export default router;
