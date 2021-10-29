import React from "react";

import Button3 from "HOC/button3";

import logowhite from "images/Logo-white.png";
import logoblue from "images/Logo-blue.png";

const Header = (props) => {
	let logo = <img src={logowhite} alt="logo-subs" />;
	if (props.logoType == "blue") {
		return <img src={logoblue} alt="logo-subs" height="130" />;
	}
	return (
		<header className="header">
			<div className="header__container">
				<a className="header__logo" href="/">
					{logo}
					{/* <img src={logoblue} alt="logo-subs" /> */}
				</a>
				<div className="header__btn">
					<Button3 linkTo={props.linkTo}>Préinscription</Button3>
				</div>
			</div>
		</header>
	);
};

export default Header;
