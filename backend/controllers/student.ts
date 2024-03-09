import { Request, Response } from "express";
import { Student } from "../db/model";

export async function getAllStudents(req: Request, res: Response) {
  try {
    const users = await Student.find();
    const filteredUsers = users.filter((item) => {
      return item.mentor != null;
    });
    return res.status(200).json(filteredUsers);
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
