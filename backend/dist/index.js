"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mentor_1 = __importDefault(require("./routes/mentor"));
const student_1 = __importDefault(require("./routes/student"));
const connection_1 = require("./db/connection");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
(0, connection_1.connectDB)();
app.use("/api/mentor", mentor_1.default);
app.use("/api/student", student_1.default);
app.get("/", (req, res) => {
    res.send("Root Page");
});
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
