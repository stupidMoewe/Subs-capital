import React from "react";
import { Link } from "react-router-dom";

import Button3 from "../../HOC/button3";

import "../../sass/main.scss";
import logo from "../../images/Logo-white.png";

const Header = (props) => {
	return (
		<header className="header">
			{/* // ${small ? 'active' : ''} */}
			<div className="header__container">
				{/* // ${small ? 'active' : ''}`} ref={someRef} */}
				<a className="header__logo" href="/">
					<img src={logo} alt="logo-subs" />
				</a>
				{/* <button className="header__btn" href="preinscription" variant="outlined">
					Login
				</button> */}
				<div
					className="header__btn"
					// href="/preinscription"
				>
					{/* <Link to={"./preinscription"}> */}
					<Button3 linkTo={props.linkTo}>Preinscription</Button3>
					{/* </Link> */}
				</div>
			</div>
		</header>
	);
};

export default Header;
