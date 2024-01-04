// Content_tbl
import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
  User_ID: { type: String, required: true },
  Request_Status: {type: String, required: true},
  Follower_ID: {type: String, required: true},
  Follow_Timestamp: { type: mongoose.Schema.Types.Timestamp, required: true, default: () => new mongoose.Types.Timestamp() },
});

// Create the User model
const UserModel2 = mongoose.model('Content_tbl', userSchema, 'Content_tbl');

// Export the User model as a named export
export { UserModel2 };
