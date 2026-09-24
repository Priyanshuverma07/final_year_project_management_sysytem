import Feedback from "../models/Feedback.js";
import MenteeProfile from "../models/MenteeProfile.js";
import User from "../models/User.js";
import { logActivity } from "../services/activityService.js"; // 🔥 THIS


// 🧑‍🎓 MENTEE GIVES FEEDBACK
export const giveFeedback = async (req, res) => {
  try {
    const menteeId = req.user.id; // from JWT
    const { mentorId, subject, message, rating } = req.body;

    // 🔹 Check mentor is assigned to this mentee
    const menteeProfile = await MenteeProfile.findOne({ userId: menteeId });

   if (!menteeProfile || !menteeProfile.mentor || menteeProfile.mentor.toString() !== mentorId) {

      return res.status(403).json({
        success: false,
        message: "You can only give feedback to your assigned mentor"
      });
    }

    // 🔹 Get mentor full name
    const mentor = await User.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({ success: false, message: "Mentor not found" });
    }

    // 🔹 Create feedback
    const feedback = await Feedback.create({
      menteeId,
      mentorId,
      mentorName: mentor.name,
      subject,
      message,
      rating
    });
    
    await logActivity(menteeId, "mentee", "GAVE_FEEDBACK", `Mentor: ${mentor.name}`);

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// 👨‍🏫 MENTOR REPLIES TO FEEDBACK
export const replyFeedback = async (req, res) => {
  try {
    const mentorId = req.user.id; // from JWT
    const { feedbackId } = req.params;
    const { response } = req.body;

    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
      return res.status(404).json({ success: false, message: "Feedback not found" });
    }

    // 🔹 Ensure only correct mentor replies
    if (feedback.mentorId.toString() !== mentorId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to reply to this feedback"
      });
    }

    feedback.response = response; // text only
    await feedback.save();

    await logActivity(mentorId, "mentor", "REPLIED_FEEDBACK", `Feedback ID: ${feedbackId}`);
    
    res.json({
      success: true,
      message: "Response added successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

  

};
