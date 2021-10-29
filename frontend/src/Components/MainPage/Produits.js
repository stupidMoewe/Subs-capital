import React from "react";
import { HashLink } from "react-router-hash-link";

import bank from "../../images/bank.png";
import coinStack from "../../images/coin-stack.png";

const scrollWithOffset = (el) => {
	const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
	const yOffset = 100;
	window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
};

const Produits = () => {
	return (
		<div className="products" id="products">
			<h2>Qu'est ce que Subs?</h2>
			<h3>Nos deux produits</h3>
			<div className="products__container">
				<div className="products__card">
					<div className="products__card-header">
						{/* <img src={bank} height="50px" alt="bank-logo" /> */}
						<h3>Compte Subs Fondation</h3>
					</div>
					<div className="products__card-description">
						<ul>
							<li>1 compte</li>
							<li>Fonds 100% garantis par Subs</li>
							<li>5% de rendement espéré</li>
							<li>Fonds disponibles à tout moment</li>
							<li>Fonds plafonnés (25 000 €)</li>
						</ul>
					</div>
				</div>
				<div className="products__card">
					<div className="products__card-header">
						{/* <img src={coinStack} height="45px" alt="coins-logo" /> */}
						<h3>Comptes Subs Alternatifs</h3>
					</div>
					<div className="products__card-description">
						<ul>
							<li>5 comptes avec différents rendements</li>
							<li>Fonds non garantis</li>
							<li>Entre 7% et 50% de rendement espéré</li>
							<li>
								Fonds bloqués pendant la durée de
								l'investissement (par semaine)
							</li>
						</ul>
						{/* <HashLink
							to="#epargne"
							className="products__card-description-lien"
							smooth
							scroll={(el) => scrollWithOffset(el)}
						>
							Voir plus.
						</HashLink> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Produits;
