"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { quizService, Question } from "@/services/api";

import QuestionFormItem from "./QuestionFormItem";

export default function CreateQuizPage() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Omit<Question, "id">[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("input title");
      return;
    }

    try {
      await quizService.createQuiz({ title, questions });
      alert("Квиз успешно создан!");

      router.push("/quizzes");
    } catch (err) {
      console.error(err);
      alert("error to save quiz");
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        type: "BOOLEAN",
        options: ["True", "False"],
        correct: ["True"],
      },
    ]);
  };

  const removeQuestion = (removeIndex: number) => {
    setQuestions(questions.filter((question, index) => index !== removeIndex));
  };

  const handleUpdateQuestion = (
    indexToUpdate: number,
    updatedQuestion: Omit<Question, "id">,
  ) => {
    const updated = [...questions];
    updated[indexToUpdate] = updatedQuestion;
    setQuestions(updated);
  };

  const handleQuestionTextChange = (index: number, newText: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = newText;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Link
        href="/quizzes"
        className="inline-block mb-6 text-(--color-primary) hover:underline"
      >
        {" "}
        back
      </Link>
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">
        Сreate quiz
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 border border-(--color-border) rounded-xl p-6 bg-white shadow-sm"
      >
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-(--color-dark)">
            Quiz title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="write your quiz title"
            required
            className="w-full border border-(--color-border) rounded-lg px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-(--color-primary) text-(--color-dark)"
          />
        </div>

        <h2 className="text-xl font-semibold mb-4 text-(--color-dark)">
          Questions ({questions.length})
        </h2>
        {questions.map((q, index) => (
          <QuestionFormItem
            key={index}
            index={index}
            question={q}
            onRemove={() => removeQuestion(index)}
            onUpdate={(updatedData) => handleUpdateQuestion(index, updatedData)}
          />
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition"
        >
          + Add question
        </button>

        <button
          type="submit"
          className="w-full bg-(--color-primary) text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Save quiz
        </button>
      </form>
    </div>
  );
}
