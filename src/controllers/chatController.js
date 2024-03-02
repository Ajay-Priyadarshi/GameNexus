import moment from 'moment-timezone';
import { ChatModel as Chat } from '../models/Chat.js';
import { UserModel as User } from '../models/User.js';

export const allChats = async (req, res) => {
  res.render('allChats');
}

export const personalChats = async (req, res) => {
  const guestId = req.params.userId;
  const userId = req.session.userId;

  const guestUser = await User.findById(guestId);
  const chats = await Chat.find({
    $or: [
      { Sender_ID: userId, Reciever_ID: guestId },
      { Sender_ID: guestId, Reciever_ID: userId },
    ],
  }).populate('Sender_ID').populate('Reciever_ID').sort({ Message_Timestamp: 1 });

  res.render('personalChat', { guestUser, chats, userId});
}

export const sendMessage = async (req, res) => {
  const { Message_Description, guestId } = req.body;
  const userId = req.session.userId;

  const newMessage = new Chat({
    Sender_ID: userId,
    Reciever_ID: guestId,
    Message_Description: Message_Description,
    Message_Status: 'sent',
    Message_Timestamp: moment().tz('Asia/Kolkata').toDate(),
  });

  await newMessage.save();

  res.redirect(`/chat/personal/${guestId}`);
}