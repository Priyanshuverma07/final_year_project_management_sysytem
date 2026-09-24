import MentorProfile from "../models/MentorProfile.js";
import User from "../models/User.js";
import Meeting from "../models/Meeting.js";
import Feedback from "../models/Feedback.js";

export const getMyProfile = async (req, res) => {
  const mentorId = req.user.id;

  const profile = await MentorProfile.findOne({ userId: mentorId })
    .populate("menteeIds", "name email");

  res.json({ success: true, profile });
};

export const getMyMeetings = async (req, res) => {
  const mentorId = req.user.id;

  const meetings = await Meeting.find({ mentorId })
    .populate("menteeId", "name");

  res.json({ success: true, meetings });
};

export const getMyFeedback = async (req, res) => {
  const mentorId = req.user.id;

  const feedbacks = await Feedback.find({ mentorId })
    .populate("menteeId", "name");

  res.json({ success: true, feedbacks });
};
