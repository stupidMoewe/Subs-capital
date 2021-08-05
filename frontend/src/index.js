import React from 'react';

import ReactDOM from 'react-dom';
import App from './Components/App.js';

import AOS from 'aos';
import 'aos/dist/aos.css';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// ReactDOM.createPortal(child, container);

AOS.init();
