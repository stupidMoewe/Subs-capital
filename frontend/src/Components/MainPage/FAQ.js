import React, { useState } from "react";

import "../../sass/main.scss";

const FAQ = () => {
	const [active1, setActive1] = useState("");
	const [active2, setActive2] = useState("");
	const [active3, setActive3] = useState("");
	const [active4, setActive4] = useState("");
	const [active5, setActive5] = useState("");
	const [active6, setActive6] = useState("");

	const clickHandler = (nb) => {
		if (nb === 1) {
			setAllToInnactive();
			return setActive1(active1 === "" ? "active" : "");
		}
		if (nb === 2) {
			setAllToInnactive();
			return setActive2(active2 === "" ? "active" : "");
		}
		if (nb === 3) {
			setAllToInnactive();
			return setActive3(active3 === "" ? "active" : "");
		}
		if (nb === 4) {
			setAllToInnactive();
			return setActive4(active4 === "" ? "active" : "");
		}
		if (nb === 5) {
			setAllToInnactive();
			return setActive5(active5 === "" ? "active" : "");
		}
		if (nb === 6) {
			setAllToInnactive();
			return setActive6(active6 === "" ? "active" : "");
		}
	};

	const setAllToInnactive = () => {
		setActive1(active1 === "active" ? "" : "");
		setActive2(active2 === "active" ? "" : "");
		setActive3(active3 === "active" ? "" : "");
		setActive4(active4 === "active" ? "" : "");
		setActive5(active5 === "active" ? "" : "");
		setActive6(active6 === "active" ? "" : "");
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
						Pourquoi ouvrir un compte Subs et pas un livret
						d’épargne ?
					</h3>
					<p className="faq__text">
						Les principaux livrets d’épargne aujourd’hui proposés
						ont des rendements si faibles que certains ne permettent
						même plus de faire face à l’inflation. Subs rend alors
						accessible à tous, une épargne technique et
						technologique, basée sur la technologie de la
						Blockchain.
						<br />
						<br />
						Cela représente un ensemble d’éléments très complexes
						que Subs a réuni le plus simplement possible dans une
						application mobile à travers une expérience utilisateur
						unique et sans nécessité de connaissance particulière.
						<br />
						<br />
						Notre objectif ? Proposer une solution d’épargne aussi
						simple que celle du Livret A.{" "}
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
					<h3 className="faq__title">Pourquoi me préinscrire ?</h3>
					<p className="faq__text">
						Les services de Subs ne sont pas encore disponibles.
						Face à la demande, nous vous proposons de vous
						préinscrire dès aujourd’hui afin de pouvoir en profiter
						dès leur sortie dans quelques semaines.
						<br />
						<br />
						Les préinscriptions nous permettent également
						d’appréhender et de répondre au mieux à vos besoins
						lorsque nos services seront disponibles.
						<br />
						<br />
						Pas de panique, la préinscription ne vous engage en rien
						et aucune donnée financière est nécessaire !
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
						Nous nous occupons de tout !
						<br />
						<br />
						Dès réception par nos services, votre argent sera
						investi par nos algorithmes dans les plateformes de
						finance décentralisée. En fonction du compte auquel vous
						avez souscri, il vous sera possible de récupérer à tout
						moment et sans aucune perte possible (avec l’ouverture
						d’un compte Fondation), ou à différents moments votre
						argent (avec l’ouverture d’un compte alternatif).
					</p>
					<button className="faq__toggle ">
						<i className="fas fa-chevron-down" />
						<i className="fas fa-times" />
					</button>
				</div>
				<div className={`faq__question ${active4}`}>
					<h3 className="faq__title">
						Comment Subs va créer de la valeur et ainsi me reverser
						une épargne ?
					</h3>
					<p className="faq__text">
						La Blockchain qui propose différentes solutions est très
						complexe et aujourd’hui réservée à des individus
						spécialisés.
						<br />
						<br />
						Subs à décider de rendre la rendre accessible à tous !
						<br />
						<br />
						Pour faire simple, nous avons mis en place des
						algorithmes permettant de déterminer les protocoles de
						finance décentralisée dans lesquels il est intéressant
						d’investir. Ces algorithmes qui sont constamment remis à
						jour et révisés, réalisent un certain nombre d’autres
						tâches invisibles pour le client et qui permettent de
						rendre notre service accessible (notamment l’achat/vente
						de stablecoin).
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
						Garantissez-vous un rendement ?
					</h3>
					<p className="faq__text">
						Un rendement ne peut être garanti car son montant exact
						est indéterminable à l'avance et dépendant d'un grand
						nombre de facteurs.
						<br />
						<br />
						Notre structure "Subs" se voit gérer l'ensemble de ces
						fonds sur différents circuits de crypto-actifs. Cela
						permet d'amortir la forte volatilité de ce type
						d'investissement tout en maximisant leurs gains. Nous
						vous fournissons donc une moyenne du rendement espéré.
					</p>
					<button className="faq__toggle ">
						<i className="fas fa-chevron-down" />
						<i className="fas fa-times" />
					</button>
				</div>
				<div
					className={`faq__question ${active6}`}
					onClick={() => clickHandler(6)}
				>
					<h3 className="faq__title">
						Garantissez-vous les dépôts ?
					</h3>
					<p className="faq__text">
						Subs garanti par ses fonds propres la totalité de vos
						dépôts sur le compte Fondation afin que vous n'ayez
						aucune perte possible. <br />
						<br />
						Nous vous proposons également des services d’assurances
						pour les comptes alternatifs.
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
