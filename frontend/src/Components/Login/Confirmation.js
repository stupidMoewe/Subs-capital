import React from "react";
import logo from "images/Logo-blue.png";

const Confirmation = () => {
	return (
		<>
			<a href="/">
				<img src={logo} className="login__img" alt="logo-subs" />
			</a>
			<div className="confirmation">
				<div className="confirmation__container">
					<h2>Votre préinscription a été confirmée!</h2>
					<p>Toute l'équipe de Subs Capital vous remercie.</p>
				</div>
			</div>
		</>
	);
};

export default Confirmation;
