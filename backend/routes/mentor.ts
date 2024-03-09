import express from "express";
import { getMentorDetails, getStudents, assignStudent, assignMarks, getMarkedStudents, unassignStudent, sendMail, finalSubmit } from '../controllers/mentor'
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.get("/:mentorId", getMentorDetails);
router.get("/get-students/:mentorId", getStudents);
router.post("/assign-student", authenticate, assignStudent);
router.post("/unassign-student", authenticate, unassignStudent);
router.post("/assign-marks",authenticate, assignMarks);
router.get("/get-marked-students/:mentorId",authenticate, getMarkedStudents);
router.post("/final-submit/:mentorId",authenticate, finalSubmit);
router.post("/send-mail", sendMail);

export default router;