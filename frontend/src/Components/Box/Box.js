import React from "react";

const Box = ({
	displayRow = true,
	backgroundColorProps = "white",
	hasBoxShadow = true,
	children,
}) => {
	const boxShadow = hasBoxShadow ? "0 0 35px -2px rgb(0 0 0 / 10%)" : "0";
	const flexDirection = displayRow ? "row" : "column";
	const background =
		backgroundColorProps === "twitter"
			? "radial-gradient(circle, rgba(195,232,250,1) 35%, rgba(195,232,250,1) 100%)"
			: backgroundColorProps === "instagram"
			? "radial-gradient(circle, rgba(238,196,223,1) 35%, rgba(238,196,223,1) 100%)"
			: "transparent";
	// const color =
	// 	backgroundColorProps === "blue"
	// 		? "white"
	// 		: backgroundColorProps === "yellow"
	// 		? "white"
	// 		: "";
	return (
		<div
			className="BoxLayout"
			style={{ flexDirection, background, boxShadow }}
		>
			{children}
		</div>
	);
};

export default Box;
