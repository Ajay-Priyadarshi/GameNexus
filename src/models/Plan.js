// Plans_tbl

import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  Plan_Name: { type: String, required: true },
  Plan_Description: { type: String, required: true },
  Price: { type: Number, required: true },
  Plan_Cycle: { type: String, required: true },
});

const PlanModel = mongoose.model('Plans_tbl', planSchema, 'Plans_tbl');

export { PlanModel };