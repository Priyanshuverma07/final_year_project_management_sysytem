import mongoose from "mongoose";

const menteeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  universityRollNo: { type: String, required: true },
  department: { type: String, required: true },
  section: { type: String, required: true },
   mentor: {   // 🔥 ADD THIS
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
});

export default mongoose.model("MenteeProfile", menteeSchema);
