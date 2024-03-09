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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.finalSubmit = exports.getMarkedStudents = exports.assignMarks = exports.unassignStudent = exports.assignStudent = exports.getStudents = exports.getMentorDetails = void 0;
const model_1 = require("../db/model");
const mongoose_1 = require("mongoose");
// Get Mentor Details
function getMentorDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mentorId = req.params.mentorId;
            console.log(mentorId);
            const mentor = yield model_1.Mentor.findById(mentorId);
            if (mentor) {
                return res.status(200).json({ details: mentor });
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
exports.getMentorDetails = getMentorDetails;
// Get the students assigned to a mentor
function getStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mentorId = req.params.mentorId;
            console.log(mentorId);
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
            const mentorId = req.headers["id"];
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
            const mentorId = req.headers["id"];
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
                    student.isMarked = null;
                    const marks = yield model_1.Marks.findById(student.marks);
                    marks.idea = 0;
                    marks.execution = 0;
                    marks.viva = 0;
                    marks.total = 0;
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
            const { studentId, mentorId } = req.body;
            const { idea, execution, viva } = req.body;
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
            marks.total = idea + execution + viva;
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
            const mentorId = req.params.mentorId;
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
            const mentorId = req.params.mentorId;
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
            return res.send("Locked!");
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
}
exports.finalSubmit = finalSubmit;
function sendMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Implement logic
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.sendMail = sendMail;
