import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password : { type: String },
  number: { type: String, unique: true },
  photo: String,
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
  marks: { type: mongoose.Schema.Types.ObjectId, ref: "Marks" },
});

const mentorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password : { type: String },
  number: { type: String, unique: true },
  photo: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const marksSchema = new mongoose.Schema({
  idea: { type: Number, default: 0 },
  execution: { type: Number, default: 0 },
  viva: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", unique: true },
});

const Student = mongoose.model("Student", studentSchema);
const Mentor = mongoose.model("Mentor", mentorSchema);
const Marks = mongoose.model("Marks", marksSchema);

export { Student, Mentor, Marks };
