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
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envPath = path_1.default.join(__dirname, '../../.env');
dotenv_1.default.config({ path: envPath });
// This looks for the .env file in the specified directory.
// dotenv.config();
// dotenv.config() looks for .env file in the root directory, i.e. where the index.js is situated.
// While hosting we dont have to worry about .env file bcoz we give that separately.
const dbURL = process.env.DATABASE_URL;
// MongoDB Connection
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uri = dbURL;
            yield mongoose_1.default.connect(uri);
            console.log("Database connected");
        }
        catch (err) {
            console.log("Error connecting to DB: " + err);
        }
    });
}
exports.connectDB = connectDB;