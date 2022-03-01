import React from "react";

import "./button3.css";

const Button3 = (props) => {
	let typeColor = "var(--subs-yellow)";
	if (props.color == "twitter") typeColor = "#00ACEE";
	if (props.color == "instagram") typeColor = "#BC2A8D";

	let fontColor = "white";
	if (props.color == "twitter") fontColor = "white";
	if (props.color == "instagram") fontColor = "white";

	const target = props.newTab ? "_blank" : "";
	return (
		<>
			<a href={props.linkTo} target={target}>
				<button
					className="button3"
					onClick={props.onClick}
					disabled={props.disabled}
					style={{
						padding: props.size == "small" ? "8px 20px" : "auto",
						backgroundColor: typeColor,
						border: typeColor,
						color: fontColor,
					}}
				>
					{props.children}
				</button>
			</a>
		</>
	);
};

export default Button3;
