import React from "react";

import "./button2.css";

const Button2 = (props) => {
	return (
		<div>
			<a href={props.linkTo}>
				<button
					className={`button2 ` + props.type}
					onClick={props.onClick}
					type={props.btnType}
				>
					{props.text}
				</button>
			</a>
		</div>
	);
};

export default Button2;
