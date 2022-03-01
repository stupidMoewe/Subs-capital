const BoxesContainer = ({ nbOfBoxes = 1, mobileBreak = false, children }) => {
	let nbBoxes = "children-1";
	if (nbOfBoxes == 2) nbBoxes = "children-2";
	if (nbOfBoxes == 3) nbBoxes = "children-3";
	if (nbOfBoxes == 4) nbBoxes = "children-4";

	let flexCol = "";
	const isMobile = window.innerWidth < 1000;
	if (mobileBreak && isMobile) flexCol = "column";
	return (
		<div
			className={["boxesContainer", nbBoxes].join(" ")}
			style={{ flexDirection: flexCol }}
		>
			{children}
		</div>
	);
};

export default BoxesContainer;
