import express from "express";
import { getMyProfile, getMyMeetings, getMyMentor } from "../controllers/menteeController.js";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";


const router = express.Router();

router.get("/profile", auth, role("mentee"), getMyProfile);
router.get("/meetings", auth, role("mentee"), getMyMeetings);
router.get("/mentor", auth, role("mentee"), getMyMentor);
router.get("/my-mentor", auth, role("mentee"), getMyMentor);



export default router;
