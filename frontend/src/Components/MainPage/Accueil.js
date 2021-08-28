import React, { Component, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Button from "../../HOC/button";

import "../../sass/main.scss";
import Button3 from "HOC/button3";
import Input from "HOC/input";

import { FaAngleDoubleDown } from "react-icons/fa";

const scrollWithOffset = (el) => {
	const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
	const yOffset = 0;
	window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
};

const Accueil = () => {
	let history = useHistory();

	const [inputValue, setInputValue] = useState("");
	const [classList, setClassList] = useState(["toast", "success"]);

	const toasts = [];
	const createToastNotification = () => {
		const notif = {
			innerText: "Préinscription réussie !",
			type: "Success",
			classList,
		};

		toasts.push(notif);

		// setTimeout(() => {
		// 	notif.classList.push("fadding");
		// 	setTimeout(() => {
		// 		notif.classList = [];
		// 	}, 500);
		// }, 4000);
	};

	if (sessionStorage.getItem("success")) {
		createToastNotification();
	}

	return (
		<>
			<div className="accueil section">
				<div className="accueil__container">
					<div className="accueil__titles">
						<h1>L'épargne d'une nouvelle ère</h1>
						<h2>1ère épargne grand public en crypto-actifs</h2>
					</div>
					<div className="accueil__description">
						Compte épargne 100% garantie pour profiter des
						cryptos-actifs
					</div>
					<div className="accueil__buttons">
						<input
							className="accueil__buttons-input"
							placeholder="Votre adresse mail !"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
						<Button3
							linkTo="/choix"
							onclick={sessionStorage.setItem(
								"email",
								inputValue
							)}
						>
							Valider ma préinscription
						</Button3>
					</div>
					<HashLink
						to="#products"
						className="accueil__haskLink"
						smooth
						scroll={(el) => scrollWithOffset(el)}
					>
						<FaAngleDoubleDown className="FaAngleDoubleDown" />
					</HashLink>
				</div>
			</div>
			<div id="toasts">
				{toasts.map((e, index) => {
					setTimeout(() => {
						classList.push("fadding");
						console.log(classList);
						// setTimeout(() => {
						// 	setClassList(["toast", "success"]);
						// 	console.log(classList);
						// }, 500);
					}, 4000);
					console.log(classList.join(" "));
					return (
						<div className={classList.join(" ")} key={index}>
							{e.innerText}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Accueil;
