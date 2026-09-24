import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  role: { type: String }, // mentor, mentee, admin
  action: { type: String, required: true }, // e.g., "GAVE_FEEDBACK"
  details: { type: String }, // extra info
}, { timestamps: true });

export default mongoose.model("ActivityLog", activityLogSchema);
