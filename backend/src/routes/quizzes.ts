import express from "express";
import prisma from "../prisma.js";
import { createQuiz, getAllQuizzes } from "../controllers/quizzes.js";

const router = express.Router();

router.post("/", createQuiz);
router.get("/", getAllQuizzes);

export default router;
