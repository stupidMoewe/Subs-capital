import React from "react";

import "./input.css";

const input = (props) => {
	const error = props.error ? "error" : "";

	return (
		<div className="input-container">
			<input
				type="text"
				id={props.id}
				className={`input  + ${error ? "error" : "active"}`}
				placeholder={props.placeHolder}
				onChange={props.onChange}
				value={props.value}
				onBlur={props.onBlur}
			/>
			{/* {props.error ? (
				<p className="input__error-message">{props.name} non valide</p>
			) : null} */}
		</div>
	);
};
export default input;
