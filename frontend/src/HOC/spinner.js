import React from "react";

import "./spinner.css";

const Spinnloader = () => {
	return (
		<div className="spinner">
			<div className="spinner-letter" id="spinner-letter-1">
				S
			</div>
			<div className="spinner-letter" id="spinner-letter-2">
				U
			</div>
			<div className="spinner-letter" id="spinner-letter-3">
				B
			</div>
			<div className="spinner-letter" id="spinner-letter-4">
				S
			</div>
			<div className="spinner-letter" id="spinner-letter-5">
				.
			</div>
		</div>
	);
};

export default Spinnloader;
