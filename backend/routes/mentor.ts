import express from "express";
import { getStudents, assignStudent, assignMarks, getMarkedStudents, unassignStudent, sendMail, finalSubmit , unlock} from '../controllers/mentor'

const router = express.Router();

router.get("/get-students", getStudents);
router.post("/assign-student", assignStudent);
router.post("/unassign-student", unassignStudent);
router.post("/assign-marks", assignMarks);
router.get("/get-marked-students", getMarkedStudents);
router.get("/final-submit", finalSubmit);
router.get("/unlock", unlock);
router.get("/send-mail", sendMail);

export default router;