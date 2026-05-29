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
		<div>
			<h1>Quiz list</h1>
			<ul>
				{quizzes &&
					quizzes.map((quiz) => {
						return (
							<li key={quiz.id}>
								<Link href={`/quizzes/${quiz.id}`}>{quiz.title}</Link>
								<p> total questions:{quiz.questionsCount}</p>
							</li>
						);
					})}
			</ul>
			<Link href="/create">create quiz</Link>
		</div>
	);
}
