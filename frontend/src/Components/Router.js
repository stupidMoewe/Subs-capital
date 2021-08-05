import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

const router = (props) => <Router>{props.children}</Router>;
export default router;
