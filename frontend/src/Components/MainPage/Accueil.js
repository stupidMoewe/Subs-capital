import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import ToastModal from "../../HOC/ToastModal";

import "../../sass/main.scss";
import Button3 from "HOC/button3";
import check from "../../images/check.svg";

import { FaAngleDoubleDown } from "react-icons/fa";

const scrollWithOffset = (el) => {
	const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
	const yOffset = 0;
	window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
};

const Accueil = () => {
	let history = useHistory();

	const [inputValue, setInputValue] = useState("");
	const [toastList, setToastList] = useState([]);
	const [hasShownSuccessToast, setHasShownSuccessToast] = useState(false);

	if (history.location.state?.success && !hasShownSuccessToast) {
		const successToast = {
			id: Math.floor(Math.random() * 100),
			title: "Préinscription réussie!",
			description: "Vous recevrez un mail de confirmation",
			icon: check,
			type: "success",
		};
		setToastList((oldToast) => [...oldToast, successToast]);
		setHasShownSuccessToast(true);
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
			<ToastModal toastList={toastList} />
		</>
	);
};

export default Accueil;
