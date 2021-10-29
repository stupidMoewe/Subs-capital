import React from "react";

import epargne1 from "../../images/epargne_1.svg";
import epargne2 from "../../images/epargne_2.svg";

const PlanEpargne = () => {
	return (
		<div className="epargne" id="epargne">
			<h2>Subs rend facile et accessible une épargne complexe !</h2>
			<div className="epargne__container">
				<div className="epargne__text">
					<h3>Compte Subs Fondation</h3>
					<p>
						Construire une épargne stable est difficile dans le
						domaine des crypto-monnaies
						<br /> Par le compte fondation, Subs vous permet de
						construire une épargne avec un rendement intéressant et
						récurrent. <br />
						Nous nous occupons de la complexité d'un tel
						investissement et assurons vos fonds.
						<br />
						Notre produit ne consiste pas en du trading de cryptos
						mais à investir des protocoles de finance décentralisée,
						qui est l'avenir de notre finance actuelle. Nous ne
						jouons pas avec votre argent, mais en constituons une
						épargne pérenne.
						<br />
						<br />
						<b>Rendement espéré de 5%/an</b>
						<br />
						<i>
							Vos dépôts sur ce compte épargne sont{" "}
							<u>garantis à 100% par Subs !</u>
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
					<h3>Comptes Subs Alternatifs</h3>
					<p>
						Basés sur le même principe que le compte fondation, les
						comptes alternatifs proposés par Subs vous permettent
						d'aller chercher des rendements bien plus intéressants.
						Selon le taux d'intéret que vous aurez choisi (jusqu'à
						50%!), Subs fera des placements plus risqués. La
						contrepartie? Les fonds ne sont plus 100% garantis par
						Subs et votre argent sera bloqué le temps de
						l'investissement.
						<br />
						<br />
						<b>
							Rendements espérés entre 7% et plus de 50%/an
						</b>{" "}
						<br />
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

{/* <div className="epargne__container bck-left">
				<div className="epargne__text">
					<h3>Vos données et actifs sont sécurisées</h3>
					<p>
						Nous suivons les mêmes mesures de sécurité que les
						grandes banques. Vos données personnelles et bancaires
						restent privées. Vos dépôts sur ce compte épargne sont
						garantis à 100% par les fonds propres de Subs Capital
						dans la limite de 25 000€.
					</p>
				</div>
				<div className="epargne__image">
					<img src={epargne1} alt="icon_secure_savings"></img>
				</div>
			</div>
			<div className="epargne__container bck-right">
				<div className="epargne__image">
					<img src={epargne2} alt="icon_sustainable_savings"></img>
				</div>
				<div className="epargne__text">
					<h3>Notre solution d'épargne est réglementée</h3>
					<p>
						L'inscription définitive ainsi que la sortie de notre
						produit seront conditionnées par l’obtention d’une
						accréditation délivrée par l’Autorité des marchés
						financiers (AMF) ainsi que l’Autorité de Contrôle
						Prudentiel et de Résolution (ACPR), afin d’être
						considéré comme un Prestataire de Services sur Actifs
						Numériques (PSAN). Cela représente un gage de qualité et
						de confiance que nous trouvons essentiel avec nos
						clients.
					</p>
				</div>
			</div>
			<div className="epargne__container bck-left">
				<div className="epargne__text">
					<h3>Vos actifs sont 100% gérés </h3>
					<p>Lorem Ipsum ...</p>
				</div>
				<div className="epargne__image">
					<img src={epargne1} alt="icon_secure_savings"></img>
				</div>
			</div> */}

export default PlanEpargne;
