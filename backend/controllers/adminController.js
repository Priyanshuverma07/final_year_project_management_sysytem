import MentorProfile from "../models/MentorProfile.js";
import MenteeProfile from "../models/MenteeProfile.js";
import User from "../models/User.js";
import Meeting from "../models/Meeting.js";
import ActivityLog from "../models/ActivityLog.js";
import { logActivity } from "../services/activityService.js";
import Feedback from "../models/Feedback.js";

export const getAllMentors = async (req, res) => {
  try {
    const mentors = await User.find({ role: "mentor" })
      .select("name email")
      .lean();

    res.json({ success: true, mentors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllMentees = async (req, res) => {
  try {
    const mentees = await User.find({ role: "mentee" })
      .select("name email")
      .lean();

    res.json({ success: true, mentees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("menteeId", "name")
      .populate("mentorId", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, feedbacks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const assignMentor = async (req, res) => {
  try {
    const { mentorId, menteeId } = req.body;

    // 🔹 Check mentor exists
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ success: false, message: "Mentor not found" });
    }

    // 🔹 Check mentee exists
    const mentee = await User.findById(menteeId);
    if (!mentee || mentee.role !== "mentee") {
      return res.status(404).json({ success: false, message: "Mentee not found" });
    }

    // 🔹 Update mentor profile
    await MentorProfile.findOneAndUpdate(
      { userId: mentorId },
      { $addToSet: { menteeIds: menteeId } }
    );

    // 🔹 Update mentee profile
    await MenteeProfile.findOneAndUpdate(
      { userId: menteeId },
      { mentor: mentorId }
    );

    // 🔥 ADD LOG ACTIVITY HERE
    await logActivity(
      req.user.id,
      "admin",
      "ASSIGNED_MENTOR",
      `Mentor ${mentorId} → Mentee ${menteeId}`
    );

    res.json({
      success: true,
      message: "Mentor assigned successfully"
    });


  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const scheduleMeeting = async (req, res) => {
  try {
    const { mentorId, menteeId, topic, meetingTime, meetingLink, notes } = req.body;

    // 🔹 Ensure mentor is assigned to mentee
    const menteeProfile = await MenteeProfile.findOne({ userId: menteeId });

    if (!menteeProfile || !menteeProfile.mentor || menteeProfile.mentor.toString() !== mentorId) {
      return res.status(403).json({ message: "Mentor not assigned to this mentee" });
    }

    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1); // Set deletion one month from now

    // 🔹 Create meeting

    const meeting = await Meeting.create({
      mentorId,
      menteeId,
      topic,
      meetingTime,
      meetingLink,
      notes,
      deleteAfter: expiry   // 🔥 ADD HERE
    });
    await logActivity(
      req.user.id,
      "admin",
      "SCHEDULED_MEETING",
      `Mentor ${mentorId} with Mentee ${menteeId}`
    );
    res.status(201).json({ success: true, meeting });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllMeetings = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const meetings = await Meeting.find({ isDeleted: false })
    .skip(skip)
    .limit(limit)
    .populate("mentorId", "name")
    .populate("menteeId", "name");

  const total = await Meeting.countDocuments({ isDeleted: false });

  res.json({
    success: true,
    total,
    page,
    pages: Math.ceil(total / limit),
    meetings
  });
};


export const getActivityLogs = async (req, res) => {
  const { role, action, startDate, endDate, page = 1, limit = 5 } = req.query;

  const skip = (page - 1) * limit;

  let filter = { isDeleted: false };

  if (role) filter.role = role;
  if (action) filter.action = action;

  if (startDate && endDate) {
    filter.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const logs = await ActivityLog.find(filter)
    .skip(skip)
    .limit(parseInt(limit))
    .populate("userId", "name role")
    .sort({ createdAt: -1 });

  const total = await ActivityLog.countDocuments(filter);

  res.json({
    success: true,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    logs
  });
};

export const softDeleteMeeting = async (req, res) => {
  await Meeting.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json({ success: true, message: "Meeting deleted" });
};

export const getNextMeetingAdmin = async (req, res) => {
  const meeting = await Meeting.findOne({
    meetingTime: { $gte: new Date() },
    status: "scheduled",
    isDeleted: false
  })
    .sort({ meetingTime: 1 })
    .populate("mentorId", "name")
    .populate("menteeId", "name");

  res.json({ meeting });
};




