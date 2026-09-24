import Meeting from "../models/Meeting.js";
import Feedback from "../models/Feedback.js";

export const runCleanup = async () => {
  const now = new Date();

  await Meeting.updateMany(
    { deleteAfter: { $lte: now } },
    { isDeleted: true }
  );

  await Feedback.updateMany(
    { deleteAfter: { $lte: now } },
    { isDeleted: true }
  );

  console.log("🧹 Cleanup done");
};
