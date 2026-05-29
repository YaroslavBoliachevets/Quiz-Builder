const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface Question {
	id?: number;
	text: string;
	type: "BOOLEAN" | "INPUT" | "CHECKBOX";
	options: string[];
	correct: string[];
}

export interface Quiz {
	id: number;
	title: string;
	questionsCount?: number;
	questions?: Question[];
	createdAt?: string;
}

export const quizService = {
	async getAll(): Promise<Quiz[]> {
		const res = await fetch(`${API_URL}/quizzes`, { cache: "no-store" });
		if (!res.ok) throw new Error("front error fech all");
		return res.json();
	},
};
