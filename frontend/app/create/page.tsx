"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { quizService, Question } from "@/services/api";

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
					<div key={index} className="mb-5 border-amber-300 border-1 p-5">
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<h3>Question №{index + 1}</h3>
							<button
								type="button"
								onClick={() => removeQuestion(index)}
								className="text-rose-800 cursor-pointer"
							>
								remove
							</button>
						</div>

						<div style={{ marginTop: "10px" }}>
							<label>question body: </label>
							<input
								type="text"
								value={q.text}
								onChange={(e) => handleQuestionTextChange(index, e.target.value)}
								placeholder="write your question"
								className="w-[80%]"
								required
							/>
						</div>
					</div>
				))}

				<button
					type="button"
					onClick={addQuestion}
					style={{
						background: "lightgreen",
						padding: "10px",
						margin: "20px 0",
						display: "block",
					}}
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
