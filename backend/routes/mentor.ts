import express from "express";
import { getStudents, assignStudent, assignMarks, editMarks, getMarkedStudents, unassignStudent, sendMail, finalSubmit } from '../controllers/mentor'
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.get("/get-students/:mentorId", authenticate, getStudents);
router.post("/assign-student", authenticate, assignStudent);
router.post("/assign-marks", authenticate, assignMarks);
router.put("/edit-marks", authenticate, editMarks);
router.get("/get-marked-students", authenticate, getMarkedStudents);
router.post("/unassign-student", authenticate, unassignStudent);
router.post("/send-mail", authenticate, sendMail);
router.post("/final-submit", authenticate, finalSubmit);

export default router;