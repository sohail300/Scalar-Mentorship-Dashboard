import { Request, Response } from "express";
import { Marks, Student } from "../db/model";

export async function getAllStudents(req: Request, res: Response) {
  try {
    const users = await Student.find();
    const filteredUsers = users.filter((item) => {
      return item.mentor == null;
    });
    return res.status(200).json({students: filteredUsers});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getProfile(req: Request, res: Response) {
  try {
    const studentId = req.params.studentId;
    const user = await Student.findById(studentId).populate([
      "mentor",
      "marks",
    ]);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(403).send("Student doesnt exist");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getMarks(req: Request, res: Response) {
  try {
    const studentId = req.params.studentId;
    const marks = await Marks.findOne({student: studentId});

    if (marks) {
      return res.status(200).json(marks);
    } else {
      return res.status(403).send("Marks doesnt exist");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
