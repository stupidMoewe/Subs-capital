import React from 'react';

import './input.css';

const input = (props) => {
	const error = props.error ? '' : 'error';
	return (
		<div className="input-container">
			<input
				className={`input ` + error}
				placeholder={props.placeHolder}
				value={props.value}
				onChange={props.onChange}
			/>
			{props.error ? null: <p className="input__error-message">{props.placeHolder} non valide</p> }
		</div>
	);
};
export default input;
