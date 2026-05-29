import express from "express";
import prisma from "../prisma.js";
import { createQuiz } from "../controllers/quizzes.js";

const router = express.Router();

router.post("/", createQuiz);

export default router;
