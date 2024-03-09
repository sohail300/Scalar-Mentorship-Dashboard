import { Request, Response } from "express";
import { Mentor, Student } from "../db/model";
import { Types } from "mongoose";

// Get the students assigned to a mentor
export async function getStudents(req: Request, res: Response) {
  try {
    const mentorId = req.headers['id'];
    const mentor = await Mentor.findById(mentorId).populate("students");

    if (mentor) {
      return res.status(200).json({ data: mentor.students });
    } else {
      return res.status(403).send("Student doesnt exist");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Mentor assigns the students to himself/herself
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

    if (!student.mentor) {
      console.log('1')
      student.mentor = mentorIdObject;
      console.log(student.mentor)
      student.save()
    } else {
      console.log('2')
      return res.status(403).send("Mentor already exist");
    }

    if (mentor.students.length < 4) {
      mentor.students.push(studentIdObject);
      mentor.save()
    } else {
      return res.status(403).send("Mentor already has 4 students");
    }
    return res.status(201).send('Assigned!')
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function unassignStudent(req: Request, res: Response) {
  try {
    const { studentId, mentorId } = req.body;

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

    if (student.mentor == mentorIdObject) {
      student.mentor = null;
    } else {
      return res.status(403).send("Mentor isnt this");
    }

    if (mentor.students.length > 3) {
      mentor.students.push(studentIdObject);
    } else {
      return res.status(403).send("Mentor has 3 students");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function assignMarks(req, res) {
  try {
    // Implement logic
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function editMarks(req, res) {
  try {
    // Implement logic
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//
export async function getMarkedStudents(req: Request, res: Response) {
  try {
    const mentorId = req.headers["id"];

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

export async function finalSubmit(req, res) {
  try {
    // Implement logic
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
