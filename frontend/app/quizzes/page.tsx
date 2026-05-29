"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Quiz, quizService } from "@/services/api";

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const data = await quizService.getAll();
      setQuizzes(data);
    } catch (error) {
      console.log("front, fetch error");
    }
  };

  const handleDeleteQuiz = async (id: number, e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await quizService.delete(id);
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    } catch (error) {
      console.log("Delete error", error);
      alert("Failed to delete quiz");
    }
  };

  return (
    <div className=" mx-auto py-10 px-4">
      <div className="md:flex md:w-[500px]  items-center justify-between mb-8">
        <h1 className="text-4xl font-black tracking-tight mb-3">Quiz list</h1>
        <Link
          href="/create"
          className="px-4 py-2 rounded-md bg-(--color-primary) text-white font-medium hover:bg-blue-700 transition"
        >
          create quiz
        </Link>
      </div>

      {quizzes.length === 0 && (
        <p className="text-(--color-muted) text-lg">No quizzes yet…</p>
      )}

      <ul className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-2">
        {quizzes &&
          quizzes.map((quiz) => {
            return (
              <li className="relative">
                <Link
                  key={quiz.id}
                  href={`/quizzes/${quiz.id}`}
                  className="block border border-(--color-border) rounded-lg  bg-white hover:shadow-md transition cursor-pointer p-5"
                >
                  <h3 className="text-xl font-semibold text-(--color-primary) hover:underline">
                    {quiz.title}
                  </h3>
                  <p className="text-(--color-muted) mt-1">
                    {" "}
                    Total questions:{" "}
                    <span className=" font-medium text-(--color-foreground)">
                      {quiz.questionsCount}
                    </span>
                  </p>
                </Link>
                <button
                  onClick={(e) => handleDeleteQuiz(quiz.id, e)}
                  className="absolute top-5 right-5 text-(--color-muted) hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition cursor-pointer z-10"
                  title="Delete quiz"
                >
                  <svg
                    xmlns="http://w3.org"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
