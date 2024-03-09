import express from "express";
import { getAllStudents, getProfile } from '../controllers/student'

const router = express.Router();

router.get("/all", getAllStudents);
router.get("/profile/:studentId", getProfile);

export default router;