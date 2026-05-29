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
    const newCorrect = question.correct.map((c) =>
      c === oldText ? newText : c,
    );
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
    <div className="mb-6 border border-(--color-border) rounded-lg p-5 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-(--color-dark)">
          Question {index + 1}
        </h3>
        <button
          type="button"
          onClick={onRemove}
          className="text-rose-700 hover:text-rose-900 font-medium"
        >
          remove
        </button>
      </div>

      {/* Question type */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-(--color-dark)">
          question type:{" "}
        </label>
        <select
          value={question.type}
          onChange={(e) => handleTypeChange(e.target.value as any)}
          className="border border-(--color-border) rounded px-3 py-2 bg-white text-(--color-dark)"
        >
          <option value="BOOLEAN" className="text-(--color-dark)">
            Boolean (True/False)
          </option>
          <option value="INPUT" className="text-(--color-dark)">
            Input (Short text)
          </option>
          <option value="CHECKBOX" className="text-(--color-dark)">
            Checkbox (Multiple choice)
          </option>
        </select>
      </div>

      {/* different type of question */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        {/* BOOLEAN */}
        {question.type === "BOOLEAN" && (
          <div>
            <p className="mb-2 font-medium text-(--color-dark)">
              select correct answer:
            </p>
            <div className="flex gap-4">
              {question.options.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 text-(--color-dark)"
                >
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
          </div>
        )}

        {/* INPUT */}
        {question.type === "INPUT" && (
          <div>
            <label className="block mb-1 font-medium text-(--color-dark)">
              write exact correct word/phrase:{" "}
            </label>
            <input
              type="text"
              value={question.correct[0] || ""}
              onChange={(e) => handleSimpleCorrectChange(e.target.value)}
              placeholder="wrigth correct answer"
              required
              className="border border-(--color-border) rounded px-3 py-2 w-full bg-white text-(--color-dark)"
            />
          </div>
        )}

        {/*  CHECKBOX */}
        {question.type === "CHECKBOX" && (
          <div>
            <p className="mb-2 font-medium text-(--color-dark)">
              Options (check correct ones):
            </p>
            {question.options.map((opt, optIndex) => (
              <div key={optIndex} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={question.correct.includes(opt)}
                  onChange={() => toggleCheckboxCorrect(opt)}
                />
                <input
                  type="text"
                  value={opt}
                  onChange={(e) =>
                    updateCheckboxOptionText(optIndex, e.target.value)
                  }
                  className="border border-(--color-border) rounded px-2 py-1 bg-white flex-1 text-(--color-dark)"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addCheckboxOption}
              className="mt-3 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-(--color-dark)"
            >
              + Add option
            </button>
          </div>
        )}
      </div>
      {/*  */}

      <div>
        <label className="block mb-1 font-medium text-(--color-dark)">
          Question body:{" "}
        </label>
        <input
          type="text"
          value={question.text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="write your question"
          className="border border-(--color-border) rounded px-3 py-2 w-full bg-white text-(--color-dark)"
          required
        />
      </div>
    </div>
  );
}
