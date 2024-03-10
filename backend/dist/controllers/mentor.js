"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.finalSubmit = exports.getMarkedStudents = exports.assignMarks = exports.unassignStudent = exports.assignStudent = exports.getStudents = void 0;
const model_1 = require("../db/model");
const mongoose_1 = require("mongoose");
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const envPath = path_1.default.join(__dirname, "../../.env");
dotenv_1.default.config({ path: envPath });
// Get the students assigned to a mentor
function getStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mentorId = "65eae53ef9872871af5f1eb4";
            const mentor = yield model_1.Mentor.findById(mentorId).populate("students");
            if (mentor) {
                return res.status(200).json({ students: mentor.students });
            }
            else {
                return res.status(403).send("Student doesnt exist");
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.getStudents = getStudents;
// Mentor assigns the student to himself/herself
function assignStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mentorId = "65eae53ef9872871af5f1eb4";
            const { studentId } = req.body;
            const student = yield model_1.Student.findById(studentId);
            if (!student) {
                return res.status(403).json({ msg: "Student doesnt exist" });
            }
            const mentor = yield model_1.Mentor.findById(mentorId);
            if (mentor.isLocked) {
                return res
                    .status(200)
                    .json({ msg: "It is locked, you cant change now!" });
            }
            if (!mentor) {
                return res.status(403).json({ msg: "Mentor doesnt exist" });
            }
            const studentIdObject = new mongoose_1.Types.ObjectId(studentId);
            const mentorIdObject = new mongoose_1.Types.ObjectId(mentorId);
            if (mentor.students.length < 4) {
                mentor.students.push(studentIdObject);
                yield mentor.save();
            }
            else {
                return res.status(403).json({ msg: "Mentor already has 4 students" });
            }
            if (!student.mentor) {
                student.mentor = mentorIdObject;
                yield student.save();
            }
            else {
                return res.status(403).json({ msg: "Mentor already exist" });
            }
            return res.status(201).json({ msg: "Assigned!" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
}
exports.assignStudent = assignStudent;
// Mentor assigns the student
function unassignStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mentorId = "65eae53ef9872871af5f1eb4";
            const { studentId } = req.body;
            const student = yield model_1.Student.findById(studentId);
            if (!student) {
                return res.status(403).json({ msg: "Student doesnt exist" });
            }
            const mentor = yield model_1.Mentor.findById(mentorId);
            console.log(mentor);
            if (mentor.isLocked) {
                return res
                    .status(200)
                    .json({ msg: "It is locked, you cant change now!" });
            }
            if (!mentor) {
                return res.status(403).json({ msg: "Mentor doesnt exist" });
            }
            const studentIdObject = new mongoose_1.Types.ObjectId(studentId);
            const mentorIdObject = new mongoose_1.Types.ObjectId(mentorId);
            if (mentor.students.length > 3) {
                let newArray = mentor.students.filter((item) => !item.equals(studentIdObject));
                mentor.students = newArray;
                yield mentor.save();
                console.log(mentor.students);
                if (mentorIdObject.equals(student.mentor)) {
                    student.mentor = null;
                    student.isMarked = false;
                    const marks = yield model_1.Marks.findById(student.marks);
                    marks.idea = 0;
                    marks.execution = 0;
                    marks.viva = 0;
                    yield marks.save();
                    yield student.save();
                }
                else {
                    return res.status(403).json({ msg: "Mentor isnt this" });
                }
            }
            else {
                return res.status(403).json({ msg: "Mentor has 3 students" });
            }
            return res.status(201).json({ msg: "Unassigned!" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
}
exports.unassignStudent = unassignStudent;
// Mentor assigns or edits marks to students
function assignMarks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mentorId = "65eae53ef9872871af5f1eb4";
            const { idea, execution, viva, studentId } = req.body;
            const student = yield model_1.Student.findById(studentId);
            const marks = yield model_1.Marks.findById(student.marks);
            const mentor = yield model_1.Mentor.findById(mentorId);
            if (mentor.isLocked) {
                return res
                    .status(203)
                    .json({ msg: "It is locked, you cant change now!" });
            }
            if (!marks) {
                return res.status(404).json({ msg: "Marks not found for the student" });
            }
            marks.idea = idea;
            marks.execution = execution;
            marks.viva = viva;
            marks.student = studentId;
            student.isMarked = true;
            yield student.save();
            yield marks.save();
            return res.status(201).json({ msg: "Marks Assigned!" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
}
exports.assignMarks = assignMarks;
// Get the marked students assigned to a mentor
function getMarkedStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mentorId = "65eae53ef9872871af5f1eb4";
            const mentor = yield model_1.Mentor.findById(mentorId);
            const mentorStudents = mentor.students;
            const markedStudents = [];
            for (let i = 0; i < mentorStudents.length; i++) {
                const item = mentorStudents[i];
                const student = yield model_1.Student.findById(item);
                if (student && student.isMarked) {
                    markedStudents.push(student);
                }
            }
            return res.json({ students: markedStudents });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.getMarkedStudents = getMarkedStudents;
function finalSubmit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mentorId = "65eae53ef9872871af5f1eb4";
            const mentor = yield model_1.Mentor.findById(mentorId);
            if (mentor.isLocked) {
                return res.status(200).json({ msg: "Already Locked!" });
            }
            const mentorStudents = mentor.students;
            for (let i = 0; i < mentorStudents.length; i++) {
                const item = mentorStudents[i];
                const student = yield model_1.Student.findById(item);
                if (!student || !student.isMarked) {
                    return res.json({ msg: "Marks not assigned to some student" });
                }
            }
            mentor.isLocked = true;
            yield mentor.save();
            const result = yield axios_1.default.get('http://localhost:3000/api/mentor/send-mail');
            return res.json({ msg: "Locked and Mail Sent!" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
}
exports.finalSubmit = finalSubmit;
const transporter = nodemailer_1.default.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
    },
});
function sendMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mentorId = "65eae53ef9872871af5f1eb4";
            const mentor = yield model_1.Mentor.findById(mentorId);
            const mentorStudents = mentor.students;
            for (let i = 0; i < mentorStudents.length; i++) {
                const item = mentorStudents[i];
                const student = yield model_1.Student.findById(item);
                if (student) {
                    console.log(student.email);
                    const info = yield transporter.sendMail({
                        from: `"Scalar Mentor Team" <sohailatwork10@gmail.com>`,
                        to: `${student.email}`,
                        subject: "Scalar Mentor Team",
                        html: `Hurray! You have been marked by your assigned Mentor.`,
                    });
                    console.log("Message sent:", info.messageId);
                }
            }
            return res.json({ msg: 'Mails Sent!' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.sendMail = sendMail;
