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

export const getAllQuizzes = async (req: Request, res: Response) => {
	try {
		const quizzes = await prisma.quiz.findMany({
			select: {
				id: true,
				title: true,
				_count: {
					select: { questions: true },
				},
			},
			orderBy: { createdAt: "desc" },
		});

		const formattedQuizzes = quizzes.map((q) => ({
			id: q.id,
			title: q.title,
			questionsCount: q._count.questions,
		}));

		res.json(formattedQuizzes);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "get all quiz error" });
	}
};

export const getQuizById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const quiz = await prisma.quiz.findUnique({
			where: { id: Number(id) },
			include: {
				questions: true,
			},
		});

		if (!quiz) {
			return res.status(404).json({ error: "quiz not found" });
		}

		res.json(quiz);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "quiz by id error" });
	}
};
