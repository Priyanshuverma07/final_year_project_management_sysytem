import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    menteeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mentorName: {   // snapshot name (good practice)
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    response: {   // mentor reply (text only)
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
