import express from "express";
import { getMyProfile, getMyMeetings, getMyFeedback } from "../controllers/mentorController.js";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";



const router = express.Router();

router.get("/profile", auth, role("mentor"), getMyProfile);
router.get("/meetings", auth, role("mentor"), getMyMeetings);
router.get("/feedback", auth, role("mentor"), getMyFeedback);

export default router;
