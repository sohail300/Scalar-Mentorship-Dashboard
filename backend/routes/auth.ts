import express from "express";
import { loginMentor, signupMentor, signupStudent, mentorProfile } from "../controllers/auth";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/login", loginMentor);
router.get("/mentor-profile",authenticate, mentorProfile);
router.post("/signup", signupMentor);
router.post("/signupStudent", signupStudent);

export default router;
