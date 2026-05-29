"use client";

import { useState, use, useEffect } from "react";
import { Quiz, quizService } from "@/services/api";
import Link from "next/link";

interface pageProps {
  params: Promise<{ id: string }>;
}

export default function PageId({ params }: pageProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const { id } = use(params);

  useEffect(() => {
    quizService
      .getQuizById(id)
      .then((data) => {
        setQuiz(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 md:w-[350px] lg:w-[500px]">
      <Link
        href="/quizzes"
        className="inline-block mb-6 text-(--color-primary) hover:underline"
      >
        back
      </Link>

      {!quiz && <p className="text-(--color-muted) text-lg">Quiz loading…</p>}
      {quiz && (
        <>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
            Quiz: {quiz.title}
          </h1>
          <p className="text-(--color-muted) mb-8">
            Total questions:{" "}
            <span className="font-semibold text-(--color-muted)">
              {quiz.questions?.length || 0}
            </span>
          </p>

          <div className="space-y-6 ">
            {quiz.questions?.map((question, index) => (
              <div
                key={question.id || index}
                className="border border-(--color-border) rounded-lg p-5 bg-white shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-2 text-(--color-dark)">
                  Question {index + 1}:{" "}
                  <span className="font-normal">{question.text}</span>
                </h3>
                <p className="text-sm text-(--color-dark) mb-4">
                  <strong className="text-(--color-foreground)">Type:</strong>{" "}
                  {question.type}
                </p>

                {question.type === "BOOLEAN" && (
                  <div className="space-y-2">
                    {["True", "False"].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 text-lg"
                      >
                        <input
                          type="radio"
                          disabled
                          checked={question.correct.includes(opt)}
                        />
                        {opt}{" "}
                        {question.correct.includes(opt) && (
                          <span className="text-green-700 text-sm">
                            correct
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                )}

                {question.type === "INPUT" && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      disabled
                      placeholder="short input"
                      className="border border-(--color-border) rounded px-3 py-2 w-full bg-gray-50"
                    />
                    <p className="text-green-700 text-sm">
                      <strong>Correct answer:</strong>{" "}
                      {question.correct.join(", ")}
                    </p>
                  </div>
                )}

                {question.type === "CHECKBOX" && (
                  <div className="space-y-2">
                    {question.options.map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 text-lg"
                      >
                        <input
                          type="checkbox"
                          disabled
                          checked={question.correct.includes(opt)}
                        />
                        {opt}{" "}
                        {question.correct.includes(opt) && (
                          <span className="text-green-700 text-sm">
                            correct
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
