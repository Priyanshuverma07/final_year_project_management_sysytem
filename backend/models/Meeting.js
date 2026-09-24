import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  menteeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  topic: { type: String, required: true },
  meetingTime: { type: Date, required: true },
  meetingLink: { type: String },   // Google Meet / Zoom
  notes: { type: String },

  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled"
  },
  
  isDeleted: { type: Boolean, default: false },
  deleteAfter: { type: Date }

}, { timestamps: true });

export default mongoose.model("Meeting", meetingSchema);
