import React from "react";

import "./button3.css";

const Button3 = (props) => {
	return (
		<>
			<a href={props.linkTo}>
				<button
					className="button3"
					onClick={props.onClick}
					disabled={props.disabled}
					style={{
						padding: props.size == "small" ? "8px 20px" : "auto",
					}}
				>
					{props.children}
				</button>
			</a>
		</>
	);
};

export default Button3;
