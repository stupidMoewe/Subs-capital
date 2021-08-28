import React, { useState } from "react";
import Button3 from "HOC/button3";

const Choices = () => {
	const [isClicked1, setIsClicked1] = useState(false);
	const [isClicked2, setIsClicked2] = useState(false);
	sessionStorage.setItem("offre1Clicked", isClicked1);
	sessionStorage.setItem("offre2Clicked", isClicked2);
	return (
		<div className="choices">
			<h2>Selectionnez le/les compte-s qui vous intéressent?</h2>
			<div className="choices__container">
				<div
					className={`choices__box choices__box-left ${
						isClicked1 ? "clicked" : ""
					}`}
					onClick={() => setIsClicked1(!isClicked1)}
				>
					{/* <div className="choices__box-cover"></div> */}
					<div className="choices__box-texts">
						<div className="choices__box-title">
							Compte Subs Fondation
						</div>
						<div className="choices__box-content">
							<ul>
								<li>Un compte d'épargne unique</li>
								<li>5% de rendement espéré</li>
								<li>Compte 100% garantie</li>
							</ul>
						</div>
					</div>
				</div>
				<div
					className={`choices__box choices__box-right ${
						isClicked2 ? "clicked" : ""
					}`}
					onClick={() => setIsClicked2(!isClicked2)}
				>
					{/* <div className="choices__box-cover"></div> */}
					<div className="choices__box-texts">
						<div className="choices__box-title">
							Compte Subs Alternatifs
						</div>
						<div className="choices__box-content">
							<ul>
								<li>Choix entre 5 comptes d'épargnes</li>
								<li>Des rendements entre 7% et 50%</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="choices__validationBtn">
				<Button3
					disabled={!isClicked1 && !isClicked2}
					linkTo="/preinscription"
				>
					Valider
				</Button3>
			</div>
		</div>
	);
};

export default Choices;
