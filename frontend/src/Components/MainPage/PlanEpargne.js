import React from "react";

import epargne1 from "../../images/epargne_1.svg";
import epargne2 from "../../images/epargne_2.svg";

const PlanEpargne = () => {
	return (
		<div className="epargne" id="epargne">
			<h2>Subs rend facile et accessible une épargne complexe !</h2>
			<div className="epargne__container">
				<div className="epargne__text">
					<h3>Compte épargne fondation </h3>
					<p>
						La gestion des crypto-actifs devient de plus en plus
						complexe.
					</p>
					<p>
						Grâce à ses propres outils de gestion de portefeuille,
						Subs vous permet de placer au mieux votre argent dans
						les crypto-actifs. Notre algorithme ainsi que nos
						équipes spécialisées optimisent vos gains en minimisant
						vos risques. Aucune compétence particulière en analyse
						financière n’est requise, ce compte est entièrement géré
						par nos équipes.
					</p>
					<p>
						<b>Rendement espéré de 10%/an</b>
					</p>
					<p>
						<i>
							En bonus, vos dépôts sur ce compte épargne sont
							garantis à 100% par Subs !
						</i>
					</p>
				</div>
				<div className="epargne__image">
					<img src={epargne1} alt="icon_secure_savings"></img>
				</div>
			</div>
			<div className="epargne__container">
				<div className="epargne__image">
					<img src={epargne2} alt="icon_sustainable_savings"></img>
				</div>
				<div className="epargne__text">
					<h3>Comptes épargnes alternatifs </h3>
					<p>
						Subs vous propose différents comptes épargne alternatifs
						fondés sur le principe du crédit. Vous prêtez de
						l’argent pour une période déterminée contre un rendement
						donné. Ces solutions d’épargnes sont basées sur la «
						finance décentralisée » et plus particulièrement sur les
						règles du « Farming ». Afin d’obtenir le meilleur de ces
						solutions, Subs a développé 5 algorithmes optimisant au
						mieux ces montages financiers.
					</p>
					<p>
						Ces comptes également entièrement gérés par nos équipes,
						vous permettent de choisir entre différents rendements
						en fonction du risque que vous êtes prêt à assumer pour
						un temps donné.
					</p>
					<p>
						<b>Rendements espérés entre 5% et 50%/an </b>
						<i>
							(en fonction de la nature du compte et du montant
							des dépôts)
						</i>
					</p>
				</div>
			</div>
		</div>
	);
};

export default PlanEpargne;
