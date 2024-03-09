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
exports.finalSubmit = exports.sendMail = exports.getMarkedStudents = exports.editMarks = exports.assignMarks = exports.unassignStudent = exports.assignStudent = exports.getStudents = void 0;
const model_1 = require("../db/model");
const mongoose_1 = require("mongoose");
// Get the students assigned to a mentor
function getStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mentorId = req.headers['id'];
            const mentor = yield model_1.Mentor.findById(mentorId).populate("students");
            if (mentor) {
                return res.status(200).json({ data: mentor.students });
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
// Mentor assigns the students to himself/herself
function assignStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mentorId = req.headers["id"];
            const { studentId } = req.body;
            const student = yield model_1.Student.findById(studentId);
            if (!student) {
                return res.status(403).send("Student doesnt exist");
            }
            const mentor = yield model_1.Mentor.findById(mentorId);
            if (!mentor) {
                return res.status(403).send("Mentor doesnt exist");
            }
            const studentIdObject = new mongoose_1.Types.ObjectId(studentId);
            const mentorIdObject = new mongoose_1.Types.ObjectId(mentorId);
            if (!student.mentor) {
                console.log('1');
                student.mentor = mentorIdObject;
                console.log(student.mentor);
                student.save();
            }
            else {
                console.log('2');
                return res.status(403).send("Mentor already exist");
            }
            if (mentor.students.length < 4) {
                mentor.students.push(studentIdObject);
                mentor.save();
            }
            else {
                return res.status(403).send("Mentor already has 4 students");
            }
            return res.status(201).send('Assigned!');
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.assignStudent = assignStudent;
function unassignStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { studentId, mentorId } = req.body;
            const student = yield model_1.Student.findById(studentId);
            if (!student) {
                return res.status(403).send("Student doesnt exist");
            }
            const mentor = yield model_1.Mentor.findById(mentorId);
            if (!mentor) {
                return res.status(403).send("Mentor doesnt exist");
            }
            const studentIdObject = new mongoose_1.Types.ObjectId(studentId);
            const mentorIdObject = new mongoose_1.Types.ObjectId(mentorId);
            if (student.mentor == mentorIdObject) {
                student.mentor = null;
            }
            else {
                return res.status(403).send("Mentor isnt this");
            }
            if (mentor.students.length > 3) {
                mentor.students.push(studentIdObject);
            }
            else {
                return res.status(403).send("Mentor has 3 students");
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.unassignStudent = unassignStudent;
function assignMarks(req, res) {
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
exports.assignMarks = assignMarks;
function editMarks(req, res) {
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
exports.editMarks = editMarks;
//
function getMarkedStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mentorId = req.headers["id"];
            // Implement logic
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.getMarkedStudents = getMarkedStudents;
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
function finalSubmit(req, res) {
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
exports.finalSubmit = finalSubmit;
