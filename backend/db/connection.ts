import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

const envPath = path.join(__dirname, '../../.env');
dotenv.config({ path: envPath });

const dbURL=process.env.DATABASE_URL;
// MongoDB Connection
export async function connectDB() {
  try {
    const uri = dbURL;
    await mongoose.connect(uri);
    console.log("Database connected");
  } catch (err) {
    console.log("Error connecting to DB: " + err);
  }
}
