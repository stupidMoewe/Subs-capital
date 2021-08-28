import React from "react";

import "./checkbox.css";

export default Checkbox = (props) => {
	return <input type="checkbox" required={props.required} />;
};
