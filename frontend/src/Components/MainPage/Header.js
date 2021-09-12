import React from "react";

import Button3 from "HOC/button3";

import logo from "images/Logo-white.png";
import "sass/main.scss";

const Header = (props) => {
	return (
		<header className="header">
			<div className="header__container">
				<a className="header__logo" href="/">
					<img src={logo} alt="logo-subs" />
				</a>
				<div className="header__btn">
					<Button3 linkTo={props.linkTo}>Preinscription</Button3>
				</div>
			</div>
		</header>
	);
};

export default Header;
