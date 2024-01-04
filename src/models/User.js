// In User.js
import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  securityQuestion: { type: String, required: true },
  answer: { type: String, required: true },
  planID: { type: String, default: 0},
  userPhoto: { type: String },
  bio: { type: String },
  planValidity: { type: Date },
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
  accountType: { type: String, required: true},
});

// Create the User model
const UserModel = mongoose.model('User_Data_tbl', userSchema, 'User_Data_tbl');

// Export the User model as a named export
export { UserModel };
