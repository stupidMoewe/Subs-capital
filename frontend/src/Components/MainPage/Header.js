import React from "react";

import { useEffect, useState } from "react";

import Button3 from "HOC/button3";

import logowhite from "images/Logo-white.png";
import logoblue from "images/Logo-blue.png";

const Header = (props) => {
	const [isHeaderTop, setIsHeaderTop] = useState(true);

	useEffect(() => {
		if (props.headerFixed) {
			window.onscroll = () => {
				if (window.pageYOffset > vh) {
					setIsHeaderTop(false);
				} else {
					setIsHeaderTop(true);
				}
			};
		}
	}, []);

	const vh = window.innerHeight;

	let logo = <img src={logowhite} alt="logo-subs" />;
	if (!isHeaderTop) {
		logo = <img src={logoblue} alt="logo-subs" height="120" />;
	}
	if (props.logoType == "blue") {
		logo = <img src={logoblue} alt="logo-subs" height="120" />;
	}

	return (
		<header
			className="header"
			style={{
				position: isHeaderTop ? "absolute" : "fixed",
				backgroundColor: isHeaderTop ? "transparent" : "white",
				boxShadow: isHeaderTop
					? null
					: "0 2px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 4px -1px rgba(0, 0, 0, 0.04)",
				height: isHeaderTop ? "10rem" : "auto",
			}}
		>
			<div
				className="header__container"
				style={{ margin: isHeaderTop ? "10px auto" : "0 auto" }}
			>
				<a className="header__logo" href="/">
					{logo}
					{/* <img src={logoblue} alt="logo-subs" /> */}
				</a>
				<div className="header__right">
					<a
						className="header__articles"
						href="/portfolio"
						style={{
							color: isHeaderTop
								? "rgba(255, 255, 255, 0.7)"
								: "var(--subs-blue)",
						}}
					>
						Portfolio
					</a>
					<div className="header__btn">
						<Button3 linkTo={props.linkTo} size="small">
							Préinscription
						</Button3>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
