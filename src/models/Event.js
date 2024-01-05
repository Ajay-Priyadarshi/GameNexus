// Event_Data_tbl

import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User_Data_tbl', required: true },
  Event_Name: { type: String, required: true },
  Event_Description: { type: String, required: true },
  Event_Timestamp: { type: Date, default: Date.now },
  Registration_Link: { type: String, required: true },
});

const EventModel = mongoose.model('Event_Data_tbl', eventSchema, 'Event_Data_tbl');

export { EventModel };
