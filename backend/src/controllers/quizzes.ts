import { Request, Response } from "express";
import prisma from "../prisma.js";

export const createQuiz = async (req: Request, res: Response) => {
	try {
		const { title, questions } = req.body;

		if (!title || !Array.isArray(questions)) {
			return res.status(400).json({
				error: "we need title and questions",
			});
		}

		const formattedQuestions = questions.map((q: any) => ({
			text: q.text, //header
			type: q.type, // 'BOOLEAN', 'INPUT' 'CHECKBOX'
			options: q.options ?? [], // to chose
			correct: q.correct ?? [], // correct answ
		}));

		const newQuiz = await prisma.quiz.create({
			data: {
				title,
				questions: {
					create: formattedQuestions,
				},
			},
			include: {
				questions: true,
			},
		});

		res.status(201).json(newQuiz);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "cant' create quiz" });
	}
};
