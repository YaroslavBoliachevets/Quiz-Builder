"use client";

import { Question } from "@/services/api";

interface QuestionFormItemProps {
	index: number;
	question: Omit<Question, "id">;
	onRemove: () => void;
	onUpdate: (updatedQuestion: Omit<Question, "id">) => void;
}

export default function QuestionFormItem({
	index,
	question,
	onRemove,
	onUpdate,
}: QuestionFormItemProps) {
	const handleTextChange = (text: string) => {
		onUpdate({ ...question, text });
	};

	// for detached section with swapper/ here is defalt meaning
	const handleTypeChange = (type: "BOOLEAN" | "INPUT" | "CHECKBOX") => {
		if (type === "BOOLEAN") {
			onUpdate({
				text: question.text,
				type,
				options: ["True", "False"],
				correct: ["True"],
			});
		} else if (type === "INPUT") {
			onUpdate({ text: question.text, type, options: [], correct: [""] });
		} else if (type === "CHECKBOX") {
			onUpdate({
				text: question.text,
				type,
				options: ["option 1", "option 2"],
				correct: [],
			});
		}
	};

	// for boolean and input
	const handleSimpleCorrectChange = (value: string) => {
		// corrct always []
		onUpdate({ ...question, correct: [value] });
	};

	// ====== ONLY for CHECKBOX
	const addCheckboxOption = () => {
		// probably need del later
		const newOptions = [
			...question.options,
			`option ${question.options.length + 1}`,
		];
		onUpdate({ ...question, options: newOptions });
	};

	const updateCheckboxOptionText = (optIndex: number, newText: string) => {
		const oldText = question.options[optIndex];
		const newOptions = [...question.options];
		newOptions[optIndex] = newText;

		// looking for an old meaning in correct options and swap it to a new one
		const newCorrect = question.correct.map((c) => (c === oldText ? newText : c));
		onUpdate({ ...question, options: newOptions, correct: newCorrect });
	};

	const toggleCheckboxCorrect = (optionText: string) => {
		const isChecked = question.correct.includes(optionText);
		const newCorrect = isChecked
			? question.correct.filter((c) => c !== optionText) // снимаем галочку
			: [...question.correct, optionText]; // ставим галочку

		onUpdate({ ...question, correct: newCorrect });
	};

	return (
		<div className="mb-5 border-amber-300 border-1 p-5 bg-white">
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
					onClick={onRemove}
					className="text-rose-800 cursor-pointer"
				>
					remove
				</button>
			</div>

			{/* type of question */}
			<div className="mt-2">
				<label>question type: </label>
				<select
					value={question.type}
					onChange={(e) => handleTypeChange(e.target.value as any)}
					className="border p-1"
				>
					<option value="BOOLEAN">Boolean (True/False)</option>
					<option value="INPUT">Input (Short text)</option>
					<option value="CHECKBOX">Checkbox (Multiple choice)</option>
				</select>
			</div>

			{/* different type of question */}
			<div className="mt-3 bg-gray-100 p-2">
				{/* BOOLEAN */}
				{question.type === "BOOLEAN" && (
					<div>
						<p>select correct answer:</p>
						{question.options.map((opt) => (
							<label key={opt} className="mr-3">
								<input
									type="radio"
									name={`boolean-correct-${index}`}
									checked={question.correct.includes(opt)}
									onChange={() => handleSimpleCorrectChange(opt)}
								/>
								{opt}
							</label>
						))}
					</div>
				)}

				{/* INPUT */}
				{question.type === "INPUT" && (
					<div>
						<label>write exact correct word/phrase: </label>
						<input
							type="text"
							value={question.correct[0] || ""}
							onChange={(e) => handleSimpleCorrectChange(e.target.value)}
							placeholder="wrigth correct answer"
							required
						/>
					</div>
				)}

				{/*  CHECKBOX */}
				{question.type === "CHECKBOX" && (
					<div>
						<p style={{ margin: "0 0 5px 0" }}>Options (check correct ones):</p>
						{question.options.map((opt, optIndex) => (
							<div key={optIndex} style={{ marginBottom: "5px" }}>
								<input
									type="checkbox"
									checked={question.correct.includes(opt)}
									onChange={() => toggleCheckboxCorrect(opt)}
								/>
								<input
									type="text"
									value={opt}
									onChange={(e) => updateCheckboxOptionText(optIndex, e.target.value)}
									style={{ marginLeft: "5px" }}
									required
								/>
							</div>
						))}
						<button
							type="button"
							onClick={addCheckboxOption}
							style={{ marginTop: "5px", background: "#eee", padding: "2px 5px" }}
						>
							+ add option
						</button>
					</div>
				)}
			</div>
			{/*  */}

			<div style={{ marginTop: "10px" }}>
				<label>question body: </label>
				<input
					type="text"
					value={question.text}
					onChange={(e) => handleTextChange(e.target.value)}
					placeholder="write your question"
					className="w-[80%]"
					required
				/>
			</div>
		</div>
	);
}
