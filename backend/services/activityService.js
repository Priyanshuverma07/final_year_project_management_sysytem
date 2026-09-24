import ActivityLog from "../models/ActivityLog.js";

export const logActivity = async (userId, role, action, details = "") => {
  try {
    await ActivityLog.create({ userId, role, action, details });
  } catch (err) {
    console.error("Activity Log Error:", err.message);
  }
};
