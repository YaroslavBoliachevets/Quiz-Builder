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
    <div className="p-5">
      <Link href="/quizzes"> back to list</Link>
      <h1>create quiz</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label>
            <span className="font-bold">quiz title</span>{" "}
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="write your quiz title"
            required
          />
        </div>

        <h2 className="mb-5">questions list ({questions.length})</h2>
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
          className="bg-green-400 p-2 my-2 block cursor-pointer"
        >
          + add question
        </button>

        <button type="submit" className="bg-amber-200 p-2 cursor-pointer">
          save quiz
        </button>
      </form>
    </div>
  );
}
