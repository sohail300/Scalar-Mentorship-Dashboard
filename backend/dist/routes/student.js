"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_1 = require("../controllers/student");
const router = express_1.default.Router();
router.get("/all", student_1.getAllStudents);
router.get("/profile/:studentId", student_1.getProfile);
exports.default = router;
