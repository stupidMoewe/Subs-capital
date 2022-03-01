import React from 'react';

import ReactDOM from 'react-dom';
import App from './app/index.js';

import AOS from 'aos';
import 'aos/dist/aos.css';

import "./sass/main.scss";

ReactDOM.render(
	// <React.StrictMode>
	// 	<App />
	// </React.StrictMode>,
	<App/>,
	document.getElementById('root')
);

AOS.init();
