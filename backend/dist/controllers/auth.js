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
exports.signupStudent = exports.loginMentor = exports.signupMentor = void 0;
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("../db/model");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envPath = path_1.default.join(__dirname, "../../.env");
dotenv_1.default.config({ path: envPath });
const saltRounds = 10;
const secretKey = process.env.SECRET_KEY;
const signupInput = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(1, { message: "This field has to be filled." })
        .max(30)
        .email("Please enter a valid email."),
    password: zod_1.z.string().min(6, { message: "Minimum 6 characters." }).max(20),
    name: zod_1.z.string().min(2).max(30),
    number: zod_1.z.string(),
    photo: zod_1.z.string(),
});
function signupMentor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const user = yield model_1.Mentor.findOne({ email });
            if (user) {
                return res.status(403).send("User already Exists");
            }
            else {
                const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
                const obj = {
                    email,
                    password: hashedPassword,
                    name,
                    number,
                    photo,
                };
                const newUser = new model_1.Mentor(obj);
                yield newUser.save();
                console.log("Mentor saved");
                const token = jsonwebtoken_1.default.sign({ id: newUser._id, role: "mentor" }, secretKey, {
                    expiresIn: "1h",
                });
                console.log(token);
                return res.status(201).json(token);
            }
        }
        catch (err) {
            return res.status(500).send({ "Internal Error": err });
        }
    });
}
exports.signupMentor = signupMentor;
const loginInput = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(1, { message: "This field has to be filled." })
        .max(30)
        .email("Please enter a valid email."),
    password: zod_1.z.string().min(6, { message: "Minimum 6 characters." }).max(20),
});
function loginMentor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const user = yield model_1.Mentor.findOne({ email });
            if (user) {
                const match = yield bcrypt_1.default.compare(password, user.password);
                if (match) {
                    const token = jsonwebtoken_1.default.sign({ id: user._id, role: "mentor" }, secretKey, {
                        expiresIn: "1h",
                    });
                    return res.status(200).json(token);
                }
                else {
                    return res.status(403).send("Invalid Credentials");
                }
            }
            else {
                return res.status(403).send("Invalid credentials email");
            }
        }
        catch (err) {
            return res.status(500).send({ "Internal Error": err });
        }
    });
}
exports.loginMentor = loginMentor;
///////////////////////////////////////////////////////////////////////
function signupStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const number = req.body.number;
            const photo = req.body.photo;
            const user = yield model_1.Student.findOne({ email });
            if (user) {
                return res.status(403).send("User already Exists");
            }
            else {
                const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
                const obj = {
                    email,
                    password: hashedPassword,
                    name,
                    number,
                    photo,
                };
                const newUser = new model_1.Student(obj);
                yield newUser.save();
                console.log("Student saved");
                const token = jsonwebtoken_1.default.sign({ id: newUser._id, role: "student" }, secretKey, {
                    expiresIn: "1h",
                });
                console.log(token);
                return res.status(201).json(token);
            }
        }
        catch (err) {
            return res.status(500).send({ "Internal Error": err });
        }
    });
}
exports.signupStudent = signupStudent;
