import React from "react";
import { HashLink } from "react-router-hash-link";

import bank from "../../images/bank.png";
import crypto from "../../images/crypto.png";
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
			<div className="products__container">
				<div className="products__card">
					{/*  data-aos="fade-up" */}
					<div className="products__card-header">
						<img src={bank} height="50px" alt="bank-logo" />
						<h3>Une application mobile</h3>
					</div>
					<div className="products__card-description">
						Virements, épargne, état de vos soldes tout est
						désormais possible sur une seule et unique application !{" "}
						<br></br>
						<br></br>
						<i>Disponible bientôt sur Android et IOS.</i>
					</div>
				</div>
				<div className="products__card">
					<div className="products__card-header">
						<img src={coinStack} height="45px" alt="coins-logo" />
						<h3>Une épargne innovante et écologique</h3>
					</div>
					<div className="products__card-description">
						Subs c’est avant tout une solution d’épargne alternative
						aux livrets bancaires. Aujourd’hui, rendons le pouvoir
						de faire fructifier votre épargne à travers différentes
						solutions d’épargne.{' '}
						{/* <br /> */}
						{/* <center> */}
							<HashLink
								to="#epargne"
								className="products__card-description-lien"
								smooth
								scroll={(el) => scrollWithOffset(el)}
							>
								Voir plus.
							</HashLink>
						{/* </center> */}
					</div>
				</div>
				{/* <div className="products__card">
					<div className="products__card-header">
						<img src={crypto} height="50px" alt="crypto-logo" />
						<h3>Achat/vente de crypto-actifs</h3>
					</div>
					<div className="products__card-description">
						Acheter et vendre des crypto-actifs (crypto-monnaies et
						token) simplement depuis votre application mobile. Plus
						simple, plus rapide, plus sécurisé.
					</div>
				</div> */}

				{/* <div className="products__card" data-aos="fade-up">
                    <div className="products__card-header">
                        <img src={credit} height="50px" alt="credit-logo" />
                        <h3>Une carte de crédit</h3>
                    </div>
                    <div className="products__card-description">
                        Parce qu’une solution bancaire se doit d’offrir une
                        solution de paiement. Subs réinvente les transactions et
                        met à votre disposition une carte de crédit vous
                        permettant de payer n’importe où et directement avec vos
                        crypto-actifs. Possibilité de dématérialiser la carte.{" "}
                        <HashLink
                            to="#cartes"
                            className="products__card-description-lien"
                            smooth
                            scroll={(el) => scrollWithOffset(el)}
                        >
                            Voir plus
                        </HashLink>
                    </div>
                </div> */}
			</div>
		</div>
	);
};

export default Produits;
