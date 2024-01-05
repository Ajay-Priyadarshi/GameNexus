// Content_tbl

import mongoose from 'mongoose';

// Define the content schema
const contentSchema = new mongoose.Schema({
  User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User_Data_tbl', required: true },
  Content_Type: { type: String, required: true },
  Content_URL: { type: String, required: true },
  Content_Description: { type: String, required: true },
  Upload_TimeStamp: { type: Date, default: Date.now },
});

// Create the Content model
const ContentModel = mongoose.model('Content_tbl', contentSchema, 'Content_tbl');

// Export the Content model as a named export
export { ContentModel };
