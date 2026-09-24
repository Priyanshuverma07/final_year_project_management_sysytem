import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  department: { type: String, required: true },
  menteeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("MentorProfile", mentorSchema);
