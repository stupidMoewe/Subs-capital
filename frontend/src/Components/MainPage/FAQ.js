import React, { useState } from "react";

import "../../sass/main.scss";

const FAQ = () => {
	const [active1, setActive1] = useState("");
	const [active2, setActive2] = useState("");
	const [active3, setActive3] = useState("");
	const [active4, setActive4] = useState("");
	const [active5, setActive5] = useState("");

	const clickHandler = (nb) => {
		if (nb === 1) {
			return setActive1(active1 === "" ? "active" : "");
		}
		if (nb === 2) {
			return setActive2(active2 === "" ? "active" : "");
		}
		if (nb === 3) {
			return setActive3(active3 === "" ? "active" : "");
		}
		if (nb === 4) {
			return setActive4(active4 === "" ? "active" : "");
		}
		if (nb === 5) {
			return setActive5(active5 === "" ? "active" : "");
		}
	};
	return (
		<div className="faq" id="faq">
			<h2>D'autres Questions?</h2>
			<div className="faq__container">
				<div
					className={`faq__question ${active1}`}
					onClick={() => clickHandler(1)}
				>
					<h3 className="faq__title">
						Pourquoi ouvrir un compte Subs et pas un autre livret
						d'épargne ?
					</h3>
					<p className="faq__text">
						Un compte chez Subs c'est pouvoir profiter d'un ensemble
						de services dans le domaine des crypto-monnaies sans
						être un expert dans le domaine. En profitant de notre
						expertise, vous aurez accès aux meilleures rendements
						proposés par la finance décentralisée.{" "}
					</p>
					<button
						className="faq__toggle "
						// onClick={() => clickHandler(1)}
					>
						<i className="fas fa-chevron-down" />
						<i className="fas fa-times" />
					</button>
				</div>
				<div
					className={`faq__question ${active2}`}
					onClick={() => clickHandler(2)}
				>
					<h3 className="faq__title">
						La préinscription est-elle un engagement définitif ?
					</h3>
					<p className="faq__text">
						La validation de votre préinscription ne vous engage pas
						à une inscription définitive lorsque notre service sera
						disponible dans quelques semaines. Cette préinscription
						a pour objectif de profiter dans les premiers de notre
						service, d'être tenue informé de nos mises à jour et de
						nombreux avantages que l'équipe vous prépare.
					</p>
					<button className="faq__toggle">
						<i className="fas fa-chevron-down" />
						<i className="fas fa-times" />
					</button>
				</div>
				<div
					className={`faq__question ${active3}`}
					onClick={() => clickHandler(3)}
				>
					<h3 className="faq__title">
						Où sera logé l'argent que je déposerai chez Subs ?
					</h3>
					<p className="faq__text">
						Votre argent sera placé par nos algorithmes dans les
						plateformes de finance décentralisé. Comme pour le
						système de crédit classique, vous prétez de l'argent, et
						recevez des intéret. Passer par notre service permet
						d'optimiser ce processus et de diminuer le risque du
						placement. De plus l'ouverture d'un tel contrat chez
						nous représente un grand nombre d'avantages. L'équipe
						vous notifiera l'ensemble de ces avantages au fur et à
						mesure de leur mise en service.
					</p>
					<button className="faq__toggle ">
						<i className="fas fa-chevron-down" />
						<i className="fas fa-times" />
					</button>
				</div>
				<div className={`faq__question ${active4}`}>
					<h3 className="faq__title">
						Garantissez-vous un rendement ?
					</h3>
					<p className="faq__text">
						Un rendement ne peut être garanti car son montant exact
						est indéterminable à l'avance et dépendant d'un grand
						nombre de facteurs. Notre structure "Subs" se voit gérer
						l'ensemble de ces fonds sur différentes circuits de
						crypto-monnaies. Cela permet de d'armortir la forte
						volatilité de ce type d'investissement tout en
						maximisant leurs gains. Nous vous fournissons donc une
						moyenne du rendement esperé. A cela, "Subs" garantit par
						l'intermédiaire d'un assureur la totalité de vos fonds
						afin que vous n'ayez aucune perte possible.
					</p>
					<button
						className="faq__toggle "
						onClick={() => clickHandler(4)}
					>
						<i className="fas fa-chevron-down" />
						<i className="fas fa-times" />
					</button>
				</div>
				<div
					className={`faq__question ${active5}`}
					onClick={() => clickHandler(5)}
				>
					<h3 className="faq__title">
						Comment Subs va créer de la valeur et ainsi me reverser
						une épargne ?
					</h3>
					<p className="faq__text">
						À l'image de du crédit classique, vous recevrait les
						intérets de votre argent que l'on aura placé.
					</p>
					<button className="faq__toggle ">
						<i className="fas fa-chevron-down" />
						<i className="fas fa-times" />
					</button>
				</div>
			</div>
			<div className="faq__contact">
				Vous avez encore des questions?{" "}
				<a href="mailto:bonjour@subs-capital.fr">Contactez-Nous</a>
			</div>
		</div>
	);
};

export default FAQ;
