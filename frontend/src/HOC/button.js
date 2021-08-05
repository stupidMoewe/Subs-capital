import React from "react";

import "./button.css";
import "../sass/main.scss";

const button = (props) => {
	const color1 = {
		color: "var(--theme-color-1)",
		borderColor: "var(--theme-color-1)",
	};
	const color2 = {
		color: "var(--theme-color-2)",
		borderColor: "var(--theme-color-2)",
	};
	const blue = {
		color: "var(--blue)",
		borderColor: "var(--blue)",
	};
	const info = {
		color: "var(--info)",
		borderColor: "var(--info)",
	};
	const indigo = {
		color: "var(--indigo)",
	};

	let colorChoosen = { "": "" };
	switch (props.color) {
		case "color1":
			colorChoosen = color1;
			break;
		case "color2":
			colorChoosen = color2;
			break;
		case "blue":
			colorChoosen = blue;
			break;
		case "info":
			colorChoosen = info;
			break;
		case "indigo":
			colorChoosen = indigo;
			break;
		default:
			break;
	}
	console.log(props.href);
	return (
		<a
			className={`button-default ` + props.color}
			style={colorChoosen}
			href={props.linkTo}
		>
			{props.children}
		</a>
	);
};

export default button;
