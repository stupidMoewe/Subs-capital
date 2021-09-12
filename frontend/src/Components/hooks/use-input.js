import { useState } from "react";

const useInput = (validateValue, type) => {
	const [enteredValue, setEnteredValue] = useState(
		sessionStorage.getItem("email") && type === "email"
			? sessionStorage.getItem("email")
			: ""
	);
	const [isTouched, setIsTouched] = useState("");

	const valueIsValid = validateValue(enteredValue);
	let hasError = !valueIsValid;

	if (!isTouched) {
		hasError = false;
	}

	const valueChangedHandler = (event) => {
		setEnteredValue(event.target.value);
	};

	const inputBlurHandler = () => {
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
