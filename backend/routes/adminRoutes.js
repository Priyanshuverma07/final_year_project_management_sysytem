import express from "express";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";
import { validate } from "../middleware/validate.js";
import { assignSchema } from "../validations/assignmentValidation.js";
import { assignMentor,scheduleMeeting ,getAllMeetings,getActivityLogs,softDeleteMeeting,getAllMentors,getAllMentees,getAllFeedbacks } from "../controllers/adminController.js";
import { scheduleMeetingSchema } from "../validations/meetingValidation.js";
const router = express.Router();

import { getNextMeetingAdmin } from "../controllers/adminController.js";


router.post(
  "/assign",
  auth,
  role("admin"),
  validate(assignSchema),
  assignMentor
);
router.post(
  "/schedule-meeting",
  auth,
  role("admin"),
  validate(scheduleMeetingSchema),
  scheduleMeeting
);

router.get("/meetings", auth, role("admin"), getAllMeetings);
router.get("/activity-logs", auth, role("admin"), getActivityLogs);

router.delete("/meeting/:id", auth, role("admin"), softDeleteMeeting);

router.get("/mentors", auth, role("admin"), getAllMentors);
router.get("/mentees", auth, role("admin"), getAllMentees);
router.get("/feedbacks", auth, role("admin"), getAllFeedbacks);



export default router;
