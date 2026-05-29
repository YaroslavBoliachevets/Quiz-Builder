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
            );
          })}
      </ul>
    </div>
  );
}
