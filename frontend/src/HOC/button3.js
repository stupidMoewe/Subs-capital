import React from "react";

import "./button3.css";

const Button3 = (props) => {
	return (
		<>
			<a href={props.linkTo}>
				<button
					className="button3"
					onClick={props.onClick}
					disabled={props.disabled ? true : false}
				>
					{props.children}
				</button>
			</a>
		</>
	);
};

export default Button3;