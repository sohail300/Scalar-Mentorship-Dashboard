import express from "express";
import { getStudents, assignStudent, assignMarks, getMarkedStudents, unassignStudent, sendMail, finalSubmit } from '../controllers/mentor'
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.get("/get-students/:mentorId", getStudents);
router.post("/assign-student", authenticate, assignStudent);
router.post("/unassign-student", authenticate, unassignStudent);
router.post("/assign-marks",authenticate, assignMarks);
router.get("/get-marked-students",authenticate, getMarkedStudents);
router.post("/final-submit",authenticate, finalSubmit);
router.post("/send-mail", sendMail);

export default router;