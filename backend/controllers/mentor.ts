import { Request, Response } from "express";
import { Marks, Mentor, Student } from "../db/model";
import { Types } from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import axios from 'axios'

const envPath = path.join(__dirname, "../../.env");
dotenv.config({ path: envPath });

// Get the students assigned to a mentor
export async function getStudents(req: Request, res: Response) {
  try {
    const mentorId = "65eae53ef9872871af5f1eb4";
    const mentor = await Mentor.findById(mentorId).populate("students");

    if (mentor) {
      return res.status(200).json({ students: mentor.students });
    } else {
      return res.status(403).send("Student doesnt exist");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Mentor assigns the student to himself/herself
export async function assignStudent(req: Request, res: Response) {
  try {
    const mentorId = "65eae53ef9872871af5f1eb4";
    const { studentId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(403).json({ msg: "Student doesnt exist" });
    }

    const mentor = await Mentor.findById(mentorId);

    if (mentor.isLocked) {
      return res
        .status(200)
        .json({ msg: "It is locked, you cant change now!" });
    }

    if (!mentor) {
      return res.status(403).json({ msg: "Mentor doesnt exist" });
    }

    const studentIdObject = new Types.ObjectId(studentId);
    const mentorIdObject = new Types.ObjectId(mentorId);

    if (mentor.students.length < 4) {
      mentor.students.push(studentIdObject);
      await mentor.save();
    } else {
      return res.status(403).json({ msg: "Mentor already has 4 students" });
    }

    if (!student.mentor) {
      student.mentor = mentorIdObject;
      await student.save();
    } else {
      return res.status(403).json({ msg: "Mentor already exist" });
    }

    return res.status(201).json({ msg: "Assigned!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

// Mentor assigns the student
export async function unassignStudent(req: Request, res: Response) {
  try {
    const mentorId = "65eae53ef9872871af5f1eb4";
    const { studentId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(403).json({ msg: "Student doesnt exist" });
    }

    const mentor = await Mentor.findById(mentorId);
    console.log(mentor);

    if (mentor.isLocked) {
      return res
        .status(200)
        .json({ msg: "It is locked, you cant change now!" });
    }

    if (!mentor) {
      return res.status(403).json({ msg: "Mentor doesnt exist" });
    }

    const studentIdObject = new Types.ObjectId(studentId);
    const mentorIdObject = new Types.ObjectId(mentorId);

    if (mentor.students.length > 3) {
      let newArray = mentor.students.filter(
        (item) => !item.equals(studentIdObject)
      );
      mentor.students = newArray;
      await mentor.save();
      console.log(mentor.students);

      if (mentorIdObject.equals(student.mentor)) {
        student.mentor = null;
        student.isMarked = false;
        const marks = await Marks.findById(student.marks);
        marks.idea = 0;
        marks.execution = 0;
        marks.viva = 0;

        await marks.save();
        await student.save();
      } else {
        return res.status(403).json({ msg: "Mentor isnt this" });
      }
    } else {
      return res.status(403).json({ msg: "Mentor has 3 students" });
    }
    return res.status(201).json({ msg: "Unassigned!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

// Mentor assigns or edits marks to students
export async function assignMarks(req: Request, res: Response) {
  try {
    const mentorId = "65eae53ef9872871af5f1eb4";
    const { idea, execution, viva, studentId } = req.body;

    const student = await Student.findById(studentId);
    const marks = await Marks.findById(student.marks);

    const mentor = await Mentor.findById(mentorId);

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
    await student.save();
    await marks.save();
    return res.status(201).json({ msg: "Marks Assigned!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

// Get the marked students assigned to a mentor
export async function getMarkedStudents(req: Request, res: Response) {
  try {
    const mentorId = "65eae53ef9872871af5f1eb4";

    const mentor = await Mentor.findById(mentorId);
    const mentorStudents = mentor.students;

    const markedStudents = [];

    for (let i = 0; i < mentorStudents.length; i++) {
      const item = mentorStudents[i];

      const student = await Student.findById(item);

      if (student && student.isMarked) {
        markedStudents.push(student);
      }
    }
    return res.json({ students: markedStudents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function finalSubmit(req: Request, res: Response) {
  try {
    const mentorId = "65eae53ef9872871af5f1eb4";

    const mentor = await Mentor.findById(mentorId);

    if (mentor.isLocked) {
      return res.status(200).json({ msg: "Already Locked!" });
    }

    const mentorStudents = mentor.students;

    for (let i = 0; i < mentorStudents.length; i++) {
      const item = mentorStudents[i];

      const student = await Student.findById(item);

      if (!student || !student.isMarked) {
        return res.json({ msg: "Marks not assigned to some student" });
      }
    }
    mentor.isLocked = true;
    await mentor.save();
    const result= await axios.get('http://localhost:3000/api/mentor/send-mail')
    
    return res.json({msg: "Locked and Mail Sent!"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function sendMail(req: Request, res: Response) {
  try {
    const mentorId = "65eae53ef9872871af5f1eb4";

    const mentor = await Mentor.findById(mentorId);
    const mentorStudents = mentor.students;

    for (let i = 0; i < mentorStudents.length; i++) {
      const item = mentorStudents[i];

      const student = await Student.findById(item);

      if (student) {
        console.log(student.email)
        const info = await transporter.sendMail({
          from: `"Scalar Mentor Team" <sohailatwork10@gmail.com>`,
          to: `${student.email}`,
          subject: "Scalar Mentor Team",
          html: `Hurray! You have been marked by your assigned Mentor.`,
        });
        console.log("Message sent:", info.messageId);
      }
    }
    return res.json({ msg: 'Mails Sent!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
