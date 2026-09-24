import API from "./axiosInstance";

// 📊 Activity Logs
export const getActivityLogs = (params) =>
  API.get("/admin/activity-logs", { params });

// 👨‍🏫 Mentors
export const getMentors = () => API.get("/admin/mentors");

// 🎓 Mentees
export const getMentees = () => API.get("/admin/mentees");

// 📝 Feedbacks
export const getFeedbacks = () => API.get("/admin/feedbacks");



