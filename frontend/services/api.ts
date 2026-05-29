import { getQuizById } from "./../../backend/src/controllers/quizzes";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface Question {
  id?: number;
  text: string;
  type: "BOOLEAN" | "INPUT" | "CHECKBOX";
  options: string[];
  correct: string[];
}

export interface Quiz {
  id: number;
  title: string;
  questionsCount?: number;
  questions?: Question[];
  createdAt?: string;
}

export const quizService = {
  async getAll(): Promise<Quiz[]> {
    const res = await fetch(`${API_URL}/quizzes`, { cache: "no-store" });
    if (!res.ok) throw new Error("front error fech all");
    return res.json();
  },

  async getQuizById(id: string): Promise<Quiz> {
    const res = await fetch(`${API_URL}/quizzes/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("front error fetch by id");
    return res.json();
  },

  async createQuiz(quizData: {
    title: string;
    questions: Omit<Question, "id">[];
  }): Promise<Quiz> {
    const res = await fetch(`${API_URL}/quizzes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quizData),
    });
    if (!res.ok) throw new Error("error create quiz");
    return res.json();
  },
};
