import express from "express";
import prisma from "../prisma.js";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  deleteQuiz,
} from "../controllers/quizzes.js";

const router = express.Router();

router.post("/", createQuiz);
router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.delete("/:id", deleteQuiz);

export default router;
