import express from 'express';
import { createChatMessage, getAllChatMessages, getChatMessageById, deleteChatMessage } from '../controllers/chatController.js';

const router = express.Router();
router.post('/chat', createChatMessage);
router.get('/chat', getAllChatMessages);
router.get('/chat/:id', getChatMessageById);
router.delete('/chat/:id', deleteChatMessage);

export default router;
