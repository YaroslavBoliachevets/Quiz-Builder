import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		res.json({ message: "работаем", data: [] });
	} catch (error) {
		res.status(500).json({ error: "ошибка" });
	}
});

export default router;
