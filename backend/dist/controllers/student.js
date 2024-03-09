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
exports.getProfile = exports.getAllStudents = void 0;
const model_1 = require("../db/model");
function getAllStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield model_1.Student.find();
            const filteredUsers = users.filter((item) => {
                return item.mentor != null;
            });
            return res.status(200).json(filteredUsers);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.getAllStudents = getAllStudents;
function getProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentId = req.params.studentId;
            const user = yield model_1.Student.findById(studentId).populate([
                "mentor",
                "marks",
            ]);
            if (user) {
                return res.status(200).json(user);
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
exports.getProfile = getProfile;
