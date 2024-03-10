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
    isMarked: Boolean
});
const mentorSchema = new mongoose_1.default.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String },
    number: { type: String, unique: true },
    photo: String,
    students: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Student" }],
    isLocked: Boolean
});
const marksSchema = new mongoose_1.default.Schema({
    idea: { type: Number, default: 0 },
    execution: { type: Number, default: 0 },
    viva: { type: Number, default: 0 },
    student: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Student",
        unique: true,
    },
});
// Pre-save hook for studentSchema
studentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!this.marks) {
                const marks = new Marks();
                marks.student = this._id;
                yield marks.save();
                this.marks = marks._id;
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
const Student = mongoose_1.default.model("Student", studentSchema);
exports.Student = Student;
const Mentor = mongoose_1.default.model("Mentor", mentorSchema);
exports.Mentor = Mentor;
const Marks = mongoose_1.default.model("Marks", marksSchema);
exports.Marks = Marks;
