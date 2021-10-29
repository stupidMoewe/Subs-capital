import React from "react";
import Header from "Components/MainPage/Header";

const Articles = () => {
	return (
		<>
			{/* <Header
				linkTo="/"
				logoType="blue"
				btnType="indigo"
				textBtn="Retour au site"
			></Header> */}
			<div className="articles">
				<h2>Subs Blog</h2>
				<div className="articles__container">
					<div className="articles__post">Item 1</div>
					<div className="articles__post">Item 2</div>
					<div className="articles__post">Item 3</div>
					<div className="articles__post">Item 4</div>
				</div>
			</div>
		</>
	);
};

export default Articles;
