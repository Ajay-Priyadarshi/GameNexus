import express from 'express';
import { allChats } from '../controllers/chatController.js';

const router = express.Router();

router.get('/', allChats);

export default router;
