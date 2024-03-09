import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Mentor, Student } from "../db/model";
import dotenv from "dotenv";
import path from "path";

const envPath = path.join(__dirname, "../../.env");
dotenv.config({ path: envPath });

const saltRounds = 10;
const secretKey = process.env.SECRET_KEY;

const signupInput = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(30)
    .email("Please enter a valid email."),
  password: z.string().min(6, { message: "Minimum 6 characters." }).max(20),
  name: z.string().min(2).max(30),
  number: z.string(),
  photo: z.string(),
});

export async function signupMentor(req: Request, res: Response) {
  try {
    const parsedInput = signupInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error,
      });
    }

    const email = parsedInput.data.email;
    const password = parsedInput.data.password;
    const name = parsedInput.data.name;
    const number = parsedInput.data.number;
    const photo = parsedInput.data.photo;

    const user = await Mentor.findOne({ email });

    if (user) {
      return res.status(403).send("User already Exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const obj = {
        email,
        password: hashedPassword,
        name,
        number,
        photo,
      };

      const newUser = new Mentor(obj);
      await newUser.save();
      console.log("Mentor saved");

      const token = jwt.sign({ id: newUser._id, role: "mentor" }, secretKey, {
        expiresIn: "1h",
      });
      console.log(token);

      return res.status(201).json(token);
    }
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
}

const loginInput = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(30)
    .email("Please enter a valid email."),
  password: z.string().min(6, { message: "Minimum 6 characters." }).max(20),
});

export async function loginMentor(req: Request, res: Response) {
  try {
    const parsedInput = loginInput.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(411).json({
        msg: parsedInput.error,
      });
    }

    const email = parsedInput.data.email;
    const password = parsedInput.data.password;
    console.log(password);

    const user = await Mentor.findOne({ email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign({ id: user._id, role: "mentor" }, secretKey, {
          expiresIn: "1h",
        });
        return res.status(200).json(token);
      } else {
        return res.status(403).send("Invalid Credentials");
      }
    } else {
      return res.status(403).send("Invalid credentials email");
    }
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
}

///////////////////////////////////////////////////////////////////////

export async function signupStudent(req: Request, res: Response) {
  try {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const number = req.body.number;
    const photo = req.body.photo;

    const user = await Student.findOne({ email });

    if (user) {
      return res.status(403).send("User already Exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const obj = {
        email,
        password: hashedPassword,
        name,
        number,
        photo,
      };

      const newUser = new Student(obj);
      await newUser.save();
      console.log("Student saved");

      const token = jwt.sign({ id: newUser._id, role: "student" }, secretKey, {
        expiresIn: "1h",
      });
      console.log(token);

      return res.status(201).json(token);
    }
  } catch (err) {
    return res.status(500).send({ "Internal Error": err });
  }
}