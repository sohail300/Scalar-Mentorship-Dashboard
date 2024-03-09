"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mentor_1 = require("../controllers/mentor");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/get-students/:mentorId", mentor_1.getStudents);
router.post("/assign-student", auth_1.authenticate, mentor_1.assignStudent);
router.post("/unassign-student", auth_1.authenticate, mentor_1.unassignStudent);
router.post("/assign-marks", auth_1.authenticate, mentor_1.assignMarks);
router.get("/get-marked-students", auth_1.authenticate, mentor_1.getMarkedStudents);
router.post("/final-submit", auth_1.authenticate, mentor_1.finalSubmit);
router.post("/send-mail", mentor_1.sendMail);
exports.default = router;
