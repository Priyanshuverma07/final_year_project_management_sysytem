import MenteeProfile from "../models/MenteeProfile.js";
import User from "../models/User.js";
import Meeting from "../models/Meeting.js";
import MentorProfile from "../models/MentorProfile.js";

export const getMyProfile = async (req, res) => {
  const profile = await MenteeProfile.findOne({ userId: req.user.id })
    .populate("mentor", "name email");

  res.json({ success: true, profile });
};

export const getMyMeetings = async (req, res) => {
  const meetings = await Meeting.find({ menteeId: req.user.id })
    .populate("mentorId", "name");

  res.json({ success: true, meetings });
};

export const getMyMentor = async (req, res) => {
  try {
    const menteeProfile = await MenteeProfile.findOne({ userId: req.user.id });
    



    if (!menteeProfile || !menteeProfile.mentor) {
      return res.status(404).json({ message: "No mentor assigned yet" });
    }

    const mentorUser = await User.findById(menteeProfile.mentor).select("name email");
    const mentorProfile = await MentorProfile.findOne({ userId: mentorUser._id });

    res.json({
      success: true,
      mentor: {
        _id: mentorUser._id,
        name: mentorUser.name,
        email: mentorUser.email,
        department: mentorProfile?.department
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


