import express from "express";
import { giveFeedback, replyFeedback } from "../controllers/feedbackController.js";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";
import { validate } from "../middleware/validate.js";
import { feedbackSchema, mentorReplySchema } from "../validations/feedbackValidation.js";
import { logActivity } from "../services/activityService.js";


const router = express.Router();

// 🧑‍🎓 Mentee gives feedback
router.post(
  "/",
  auth,
  role("mentee"),
  validate(feedbackSchema),
  giveFeedback
);

// 👨‍🏫 Mentor replies
router.put(
  "/reply/:feedbackId",
  auth,
  role("mentor"),
  validate(mentorReplySchema),
  replyFeedback
);

export default router;
