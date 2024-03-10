import express from "express";
import { getMentorDetails, getStudents, assignStudent, assignMarks, getMarkedStudents, unassignStudent, sendMail, finalSubmit } from '../controllers/mentor'

const router = express.Router();

router.get("/", getMentorDetails);
router.get("/get-students", getStudents);
router.post("/assign-student", assignStudent);
router.post("/unassign-student", unassignStudent);
router.post("/assign-marks", assignMarks);
router.get("/get-marked-students", getMarkedStudents);
router.post("/final-submit", finalSubmit);
router.post("/send-mail", sendMail);

export default router;