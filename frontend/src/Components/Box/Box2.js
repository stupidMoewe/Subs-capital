const Box2 = ({ flex, bgColor = "", ftColor = "", children }) => {
	let flexStyle = "";
	if (flex == 1) flexStyle = "flex-1";
	else if (flex == 2) flexStyle = "flex-2";
	else if (flex == 3) flexStyle = "flex-3";
	else if (flex == 4) flexStyle = "flex-4";

	let fontColor = "";
	if (ftColor == "blue") fontColor = "var(--subs-blue)";
	if (ftColor == "yellow") fontColor = "var(--subs-yellow)";
	if (ftColor == "white") fontColor = "white";

	let backgroundColor = bgColor;
	// console.log(bgColor);
	// if (bgColor == "yellow") backgroundColor = "rgba(255, 198, 0, 0.4);";
	// if (bgColor == "blue") backgroundColor = "rgba(0, 172, 238, 0.29);";
	// if (bgColor == "pink") backgroundColor = "rgba(188, 42, 141, 0.29);";
	// console.log(backgroundColor);
	return (
		<div
			className={["box2", flexStyle].join(" ")}
			style={{ backgroundColor: backgroundColor, color: fontColor }}
		>
			{children}
		</div>
	);
};

export default Box2;
