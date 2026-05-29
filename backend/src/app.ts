import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import quizzesRouter from "./routes/quizzes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/quizzes", quizzesRouter);

export default app;
