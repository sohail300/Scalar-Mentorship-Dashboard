import { Request, Response } from "express";
import { Marks, Mentor, Student } from "../db/model";
import { Types } from "mongoose";

// Get the students assigned to a mentor
export async function getStudents(req: Request, res: Response) {
  try {
    // const mentorId = req.headers['id'];
    const mentorId = req.params.mentorId;
    console.log(mentorId);
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
    const mentorId: any = req.headers["id"];
    const { studentId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(403).send("Student doesnt exist");
    }

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(403).send("Mentor doesnt exist");
    }

    const studentIdObject = new Types.ObjectId(studentId);
    const mentorIdObject = new Types.ObjectId(mentorId);

    if (mentor.students.length < 4) {
      mentor.students.push(studentIdObject);
      await mentor.save();
    } else {
      return res.status(403).send("Mentor already has 4 students");
    }

    if (!student.mentor) {
      student.mentor = mentorIdObject;
      await student.save();
    } else {
      return res.status(403).send("Mentor already exist");
    }

    
    return res.status(201).send("Assigned!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Mentor assigns the student
export async function unassignStudent(req: Request, res: Response) {
  try {
    const mentorId: any = req.headers["id"];
    const { studentId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(403).send("Student doesnt exist");
    }

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(403).send("Mentor doesnt exist");
    }

    const studentIdObject = new Types.ObjectId(studentId);
    const mentorIdObject = new Types.ObjectId(mentorId);

    if (mentorIdObject.equals(student.mentor)) {
      student.mentor = null;
      await student.save();
    } else {
      return res.status(403).send("Mentor isnt this");
    }

    if (mentor.students.length > 1) {
      let newArray = mentor.students.filter(
        (item) => !item.equals(studentIdObject)
      );
      mentor.students = newArray;
      await mentor.save();
      console.log(mentor.students);
    } else {
      return res.status(403).send("Mentor has 3 students");
    }
    return res.status(201).send("Unassigned!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Mentor assigns or edits marks to students
export async function assignMarks(req: Request, res: Response) {
  try {
    const { studentId } = req.body;
    const { idea, execution, viva } = req.body;
    console.log(studentId);
    console.log(idea);
    console.log(execution);
    console.log(viva);

    const student = await Student.findById(studentId);
    const marks = await Marks.findById(student.marks);
    console.log(marks);

    if (!marks) {
      return res.status(404).send("Marks not found for the student");
    }

    marks.idea = idea;
    marks.execution = execution;
    marks.viva = viva;
    marks.total = idea + execution + viva;
    marks.student = studentId;

    student.isMarked = true;
    await student.save();

    await marks.save();
    console.log(marks);

    return res.status(201).send("Marks Assigned!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get the marked students assigned to a mentor
export async function getMarkedStudents(req: Request, res: Response) {
  try {
    const mentorId = req.headers["id"];
    // const mentorId = "65eae53ef9872871af5f1eb4";

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
    return res.json({students: markedStudents});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function finalSubmit(req, res) {
  try {
    // Implement logic
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function sendMail(req, res) {
  try {
    // Implement logic
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
