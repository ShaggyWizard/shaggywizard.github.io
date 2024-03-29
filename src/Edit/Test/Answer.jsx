import { useContext, useEffect, useState } from "react";
import { ToolContext } from "../../App";
import Input from "../../Input";

export default function Answer({ questionIndex, index }) {
	const { test, setTest, currentLang } = useContext(ToolContext);

	const handleAnswerChange = (e) => {
		const nextTest = { ...test };
		nextTest.test[questionIndex].answers[index][currentLang] = e.target.value;
		setTest(nextTest);
	}
	const handleAnswerValueChange = (e, i) => {
		const nextTest = { ...test };
		if (!nextTest.test[questionIndex].answers[index].values) {
			nextTest.test[questionIndex].answers[index].values = [];
		}
		while (nextTest.test[questionIndex].answers[index].values?.[i] === undefined) {
			nextTest.test[questionIndex].answers[index].values.push(0);
		}
		nextTest.test[questionIndex].answers[index].values[i] = e.target.value;
		setTest(nextTest);
	}
	const removeMe = () => {
		const nextTest = { ...test };
		nextTest.test[questionIndex].answers.splice(index, 1);
		setTest(nextTest);
	}

	return (
		<div className="flex flex-col gap-2 p-2 bg-blue-200/20">
			<div className="flex gap-2 items-center p-2 ">
				<div className="flex-1 flex flex-col gap-2 items-stretch ">
					<Input
						className="flex gap-2 items-center"
						inputClass="flex-1"
						value={test.test[questionIndex].answers?.[index]?.[currentLang] ?? ""}
						onChange={handleAnswerChange}
						label={(index + 1)}
					/>
				</div>
				<button
					className="aspect-square bg-red-500 w-auto h-8 rounded-full text-white font-bold"
					onClick={removeMe}
				>
					X
				</button>
			</div>
			<div className="grid gap-2 p-2" style={{ gridTemplateColumns: `repeat(${Math.min(6, test.weights.length)}, 1fr)` }}>
				{test.weights.map((weight, i) =>
					<Input
						key={i}
						className="flex gap-2 items-center"
						labelClass="text-xl font-bold"
						inputClass="flex-1"
						type="number"
						value={test.test[questionIndex].answers?.[index]?.values?.[i] ?? 0}
						onChange={(e) => handleAnswerValueChange(e, i)}
						label={weight}
					/>
				)}
			</div>
		</div>
	);
}