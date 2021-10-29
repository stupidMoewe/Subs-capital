import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import ToastModal from "HOC/ToastModal";
import Button3 from "HOC/button3";

import "sass/main.scss";
import check from "images/check.svg";
import { FaAngleDoubleDown } from "react-icons/fa";

const scrollWithOffset = (el) => {
	const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
	const yOffset = 0;
	window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
};

const Accueil = () => {
	let history = useHistory();

	const [inputValue, setInputValue] = useState("");
	const [toastList, setToastList] = useState([]);
	const [hasShownSuccessToast, setHasShownSuccessToast] = useState(false);
	const [text, setText] = useState("");
	const [idxText, setIdxText] = useState(0);
	const [idxTextList, setIdxTextList] = useState(0);

	if (history.location.state?.success && !hasShownSuccessToast) {
		const successToast = {
			id: Math.floor(Math.random() * 100),
			title: "Préinscription réussie!",
			description: "Vous recevrez un mail de confirmation",
			icon: check,
			type: "success",
		};
		setToastList((oldToast) => [...oldToast, successToast]);
		setHasShownSuccessToast(true);
	}

	const texts = ["abc@xyz.com                    "];
	const speed = 100;

	useEffect(() => {
		if (idxTextList < texts.length) {
			if (idxText < texts[idxTextList].length) {
				let timer = setTimeout(() => {
					setText(text + texts[idxTextList][idxText]);
					setIdxText(idxText + 1);
				}, speed);
				return () => clearTimeout(timer);
			} else {
				setIdxTextList(idxTextList + 1);
				setIdxText(0);
				setText("");
			}
		} else {
			setIdxTextList(0);
			setIdxText(0);
			setText("");
		}
	}, [idxText, idxTextList, text, texts]);

	return (
		<>
			<div className="accueil section">
				<div className="accueil__container">
					<div className="accueil__titles">
						<h1>
							{/* L'épargne d'une nouvelle ère */}
							Nos condoléances au livret A
						</h1>
						<h2>1ère épargne grand public en crypto-actifs</h2>
					</div>
					<div className="accueil__description">
						Compte épargne 100% garantie pour profiter des
						crypto-actifs
					</div>
					<div className="accueil__buttons">
						<input
							className="accueil__buttons-input"
							placeholder={text}
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							style={{ fontStyle: "italic" }}
						/>
						<Button3
							linkTo="/choix"
							onclick={sessionStorage.setItem(
								"email",
								inputValue
							)}
						>
							Valider ma préinscription
						</Button3>
					</div>
					<HashLink
						to="#products"
						className="accueil__haskLink"
						smooth
						scroll={(el) => scrollWithOffset(el)}
					>
						<FaAngleDoubleDown className="FaAngleDoubleDown" />
					</HashLink>
				</div>
			</div>
			<ToastModal toastList={toastList} />
		</>
	);
};

export default Accueil;
