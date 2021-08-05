import React from "react";
import mockupApp from "../../images/mockupApp.png";
import Button from "../../HOC/button";

import "../../sass/main.scss";

const Accueil = () => {
	return (
		<div className="accueil">
			<div className="accueil__gauche">
				<h1>Constituez une véritable épargne</h1>
				<h2 className="">
					Investissez simplement avec Subs dans les crypto-actifs
				</h2>
				<div className="accueil__gauche-form">
					<input
						className="input-email"
						placeholder="Votre adresse mail"
					/>
					<Button color="indigo" linkTo="/preinscription">
						Valider ma préinscription !
					</Button>
				</div>
			</div>
			<div className="accueil__droit">
				<img className="mockup" src={mockupApp} alt="app-mockup" />
			</div>
		</div>
	);
};

export default Accueil;
