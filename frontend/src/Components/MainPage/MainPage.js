import React from "react";

import Header from "./Header";
import Accueil from "./Accueil";
import Produits from "./Produits";
import PlanEpargne from "./PlanEpargne";
import FAQ from "./FAQ";
import Bottom from "./Bottom";

import "../../sass/main.scss";

const MainPage = (props) => {
	return (
		<>
		<div className="mainpage">
			<Header btnType="blue" linkTo="/choix" textBtn="Se préinscrire" />
			<Accueil />
			<Produits />
			<PlanEpargne />
			<FAQ />
			<Bottom />
		</div>
		{/* <ToastPortal/> */}
		</>
	);
};

export default MainPage;
