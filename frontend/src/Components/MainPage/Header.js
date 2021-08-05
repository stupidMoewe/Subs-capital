import React from "react";
import { Link } from "react-router-dom";

import Button2 from "../../HOC/button2";

import "../../sass/main.scss";
import logo from "../../images/Logo.png";

const Header = (props) => {
	return (
		<header className="header">
			{/* // ${small ? 'active' : ''} */}
			<div className="header__container">
				{/* // ${small ? 'active' : ''}`} ref={someRef} */}
				<a className="header__logo" href="/">
					<img src={logo} height="100" alt="logo-subs" />
				</a>
				{/* <button className="header__btn" href="preinscription" variant="outlined">
					Login
				</button> */}
				<div
					className="header__btn"
					// href="/preinscription"
				>
					{/* <Link to={"./preinscription"}> */}
						<Button2
							type={props.btnType}
							linkTo={props.linkTo}
							text={props.textBtn}
						/>
					{/* </Link> */}
				</div>
			</div>
		</header>
	);
};

export default Header;
