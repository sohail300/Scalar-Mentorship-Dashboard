import express from "express";
import { getAllStudents, getProfile, getMarks } from '../controllers/student'

const router = express.Router();

router.get("/all", getAllStudents);
router.get("/profile/:studentId", getProfile);
router.get("/marks/:studentId", getMarks);

export default router;