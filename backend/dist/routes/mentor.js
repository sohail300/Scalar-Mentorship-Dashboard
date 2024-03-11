"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mentor_1 = require("../controllers/mentor");
const router = express_1.default.Router();
router.get("/get-students", mentor_1.getStudents);
router.post("/assign-student", mentor_1.assignStudent);
router.post("/unassign-student", mentor_1.unassignStudent);
router.post("/assign-marks", mentor_1.assignMarks);
router.get("/get-marked-students", mentor_1.getMarkedStudents);
router.get("/final-submit", mentor_1.finalSubmit);
router.get("/unlock", mentor_1.unlock);
router.get("/send-mail", mentor_1.sendMail);
exports.default = router;
