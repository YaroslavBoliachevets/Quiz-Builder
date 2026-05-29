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
		<>
			<Link href="/quizzes">back</Link>
			{quiz && (
				<>
					<h1>quiz: {quiz.title}</h1>
					<p>total question: {quiz.questions?.length || 0}</p>

					<div className="mt-5">
						{quiz.questions?.map((question, index) => (
							<div
								key={question.id || index}
								className="mb-5 border-2 border-gray p-2"
							>
								<h3>
									question №{index + 1}: {question.text}
								</h3>
								<p>
									<strong>type:</strong> {question.type}
								</p>

								{question.type === "BOOLEAN" && (
									<div>
										{["True", "False"].map((opt) => (
											<label key={opt} className="block">
												<input
													type="radio"
													disabled
													checked={question.correct.includes(opt)}
												/>
												{opt}{" "}
												{question.correct.includes(opt) && (
													<span className="text-green-800">right asnw</span>
												)}
											</label>
										))}
									</div>
								)}

								{question.type === "INPUT" && (
									<div>
										<input type="text" disabled placeholder="short input" />
										<p className="text-green-800">
											<strong>Right answer:</strong> {question.correct.join(", ")}
										</p>
									</div>
								)}

								{question.type === "CHECKBOX" && (
									<div>
										{question.options.map((opt) => (
											<label key={opt} className="block">
												<input
													type="checkbox"
													disabled
													checked={question.correct.includes(opt)}
												/>
												{opt}{" "}
												{question.correct.includes(opt) && (
													<span className="text-green-800">right asnw</span>
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
		</>
	);
}
