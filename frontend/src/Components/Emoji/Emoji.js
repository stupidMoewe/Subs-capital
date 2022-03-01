import React from "react";

const Emoji = React.memo(({ className, label, symbol }) => (
	<span
		className={className}
		role="img"
		aria-label={label}
		style={{
			fontSize: "20px",
		}}
	>
		{String.fromCodePoint(symbol)}
	</span>
));

export default Emoji;
