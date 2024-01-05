// User_Data_tbl

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  securityQuestion: { type: String, required: true },
  answer: { type: String, required: true },
  Plan_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Plans_tbl', required: true },
  userPhoto: { type: String },
  bio: { type: String },
  planValidity: { type: Date },
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
  accountType: { type: String, required: true},
});

const UserModel = mongoose.model('User_Data_tbl', userSchema, 'User_Data_tbl');

export { UserModel };
