import { ChatModel } from '../models/Chat.js';

async function createChatMessage(req, res) {
  try {
    const { User_ID, Message_Description, Message_Status } = req.body;
    const newChatMessage = new ChatModel({
      User_ID,
      Message_Description,
      Message_Status
    });
    const savedMessage = await newChatMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllChatMessages(req, res) {
  try {
    const allChatMessages = await ChatModel.find();
    res.status(200).json(allChatMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getChatMessageById(req, res) {
  try {
    const { id } = req.params;
    const chatMessage = await ChatModel.findById(id);
    if (!chatMessage) {
      return res.status(404).json({ error: 'Chat message not found' });
    }
    res.status(200).json(chatMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteChatMessage(req, res) {
  try {
    const { id } = req.params;
    const deletedMessage = await ChatModel.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ error: 'Chat message not found' });
    }
    res.status(200).json({ message: 'Chat message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { createChatMessage, getAllChatMessages, getChatMessageById, deleteChatMessage };
