"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Marks = exports.Mentor = exports.Student = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema = new mongoose_1.default.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String },
    number: { type: String, unique: true },
    photo: String,
    mentor: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Mentor" },
    marks: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Marks" },
});
const mentorSchema = new mongoose_1.default.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String },
    number: { type: String, unique: true },
    photo: String,
    students: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Student" }],
});
const marksSchema = new mongoose_1.default.Schema({
    idea: { type: Number, default: 0 },
    execution: { type: Number, default: 0 },
    viva: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    student: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Student", unique: true },
});
const Student = mongoose_1.default.model("Student", studentSchema);
exports.Student = Student;
const Mentor = mongoose_1.default.model("Mentor", mentorSchema);
exports.Mentor = Mentor;
const Marks = mongoose_1.default.model("Marks", marksSchema);
exports.Marks = Marks;
