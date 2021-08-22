import { useState } from "react";

const useInput = (validateValue) => {
	const [enteredValue, setEnteredValue] = useState("");
	const [isTouched, setIsTouched] = useState("");

	const valueIsValid = validateValue(enteredValue);
	let hasError = !valueIsValid;

	if (!isTouched) {
		hasError = false;
	}

	const valueChangedHandler = (event) => {
		setEnteredValue(event.target.value);
	};

	const inputBlurHandler = (event) => {
		setIsTouched(true);
	};

	const reset = () => {
		setEnteredValue("");
		setIsTouched(false);
	};

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangedHandler,
		inputBlurHandler,
		reset,
	};
};

export default useInput;
