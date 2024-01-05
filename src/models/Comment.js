// Comment_tbl

import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User_Data_tbl', required: true },
  Content_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Content_tbl', required: true },
  Comment_Description: { type: String, required: true },
  Comment_Timestamp: { type: Date, default: Date.now },
});

const CommentModel = mongoose.model('Comment_tbl', commentSchema, 'Comment_tbl');

export { CommentModel };
