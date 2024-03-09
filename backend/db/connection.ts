import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

const envPath = path.join(__dirname, '../../.env');
dotenv.config({ path: envPath });
// This looks for the .env file in the specified directory.

// dotenv.config();
// dotenv.config() looks for .env file in the root directory, i.e. where the index.js is situated.

// While hosting we dont have to worry about .env file bcoz we give that separately.

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
