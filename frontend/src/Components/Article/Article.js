import React, { useEffect, useState } from "react";

import Header from "../MainPage/Header";

import paulPic from "../../images/author1.png";
import LouisPic from "../../images/author1.png";
import martinPic from "../../images/author1.png";

const baseURL = process.env.REACT_APP_BASE_URL;

const Article = (props) => {
	const urlId = props.match.params.id;

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [article, setArticle] = useState([]);

	useEffect(() => {
		fetch(baseURL + "/articles/" + urlId)
			.then((response) => {
				return response.json();
			})
			.then(
				(data) => {
					setIsLoaded(true);
					setArticle(data.article);
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			);
	}, []);

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		let picture;
		let author;
		if (article.author === "martin") {
			author = "Martin Tefra ";
			picture = (
				<img
					src={martinPic}
					className="article__author-picture"
					width="50px"
					height="50px"
					alt="author"
				></img>
			);
		} else if (article.author === "louis") {
			author = "Louis Arsenneau";
			picture = (
				<img
					src={LouisPic}
					className="article__author-picture"
					width="50px"
					height="50px"
					alt="author"
				></img>
			);
		} else if (article.author === "paul") {
			author = "Paul Poulain ";
			picture = (
				<img
					src={paulPic}
					className="article__author-picture"
					width="50px"
					height="50px"
					alt="author"
				></img>
			);
		}
		return (
			<>
				<Header
					linkTo="/"
					btnType="indigo"
					textBtn="Retour au site"
				></Header>
				<div className="article">
					<h1 className="article__header">{article.title}</h1>
					<h2 className="article__sub-header">{article.subHeader}</h2>
					<div className="article__author">
						{picture}
						<div className="article__author-text">
							{author}• {article.parutionDate}•{" "}
							{article.readingTime} min à lire
						</div>
					</div>
					<div className="article__text">{article.text}</div>
				</div>
			</>
		);
	}
};

export default Article;
