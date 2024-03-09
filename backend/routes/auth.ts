import express from "express";
import { loginMentor, signupMentor, signupStudent } from "../controllers/auth";

const router = express.Router();

router.post("/login", loginMentor);
router.post("/signup", signupMentor);
router.post("/signupStudent", signupStudent);

export default router;
