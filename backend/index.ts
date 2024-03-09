import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoute from "./routes/auth";
import mentorRoute from "./routes/mentor";
import studentRoute from "./routes/student";
import { connectDB } from "./db/connection";
// import { authenticate, secretKey } from "./middleware/auth";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectDB();
app.use("/api/auth", authRoute);
app.use("/api/mentor", mentorRoute);
app.use("/api/student", studentRoute);

app.get("/", (req, res) => {
  res.send("Root Page");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
