import React, { Component, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import { db } from "../../firebase";

import useInput from "../hooks/use-input";

import Input from "../../HOC/input";
import logo from "../../images/Logo-white.png";
import Button3 from "../../HOC/button3";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

function Login(props) {
	let history = useHistory();
	const [isBox1Checked, setIsBox1Checked] = useState(false);
	const [isBox2Checked, setIsBox2Checked] = useState(false);
	const {
		value: firstNameValue,
		isValid: firstNameIsValid,
		hasError: firstNameHasError,
		valueChangedHandler: firstNameChangeHandler,
		inputBlurHandler: firstNameBlurHandler,
		reset: resetFirstName,
	} = useInput(isNotEmpty);
	const {
		value: lastNameValue,
		isValid: lastNameIsValid,
		hasError: lastNameHasError,
		valueChangedHandler: lastNameChangeHandler,
		inputBlurHandler: lastNameBlurHandler,
		reset: resetLastName,
	} = useInput(isNotEmpty);
	let {
		value: emailValue,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangedHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmail,
	} = useInput(isEmail);

	let formIsValid = false;

	if (
		firstNameIsValid &&
		lastNameIsValid &&
		emailIsValid &&
		isBox2Checked
	) {
		formIsValid = true;
	}

	if (localStorage.getItem("email")) {
		emailValue = localStorage.getItem("email");
	}

	const submitHandler = (event) => {
		event.preventDefault();

		if (!formIsValid) {
			return;
		}

		db.collection("preinscriptions")
			.add({
				created: Date(),
				email: emailValue,
				name: lastNameValue,
				surname: firstNameValue,
			})
			.then(() => {
				console.log("Document successfully written!");
				localStorage.setItem("success", true);
				history.push({
					pathname: "/",
				});
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});

		resetFirstName();
		resetLastName();
		resetEmail();
	};

	return (
		<div className="login">
			<a href="/">
				<img src={logo} className="login__img" alt="logo-subs" />
			</a>
			<h2 className="login__title">Se préinscrire gratuitement.</h2>

			<form className="form" onSubmit={submitHandler}>
				<div className="login__field">
					<label className="login__label">Email:</label>
					<Input
						id="email"
						name="Email"
						placeHolder="Email"
						value={emailValue}
						onChange={emailChangeHandler}
						onBlur={emailBlurHandler}
						error={emailHasError}
					/>
					<div />
				</div>
				<div className="login__field">
					<label className="login__label">Quel est votre Nom?</label>
					<Input
						id="name"
						name="Nom"
						placeHolder="Nom"
						value={lastNameValue}
						onChange={lastNameChangeHandler}
						onBlur={lastNameBlurHandler}
						error={lastNameHasError}
					/>
				</div>
				<div className="login__field">
					<div className="login__label">Quel est votre prénom?</div>
					<Input
						id="prenom"
						name="Prenom"
						placeHolder="Prénom"
						value={firstNameValue}
						onChange={firstNameChangeHandler}
						onBlur={firstNameBlurHandler}
						error={firstNameHasError}
					/>
				</div>
				<div className="login__checkboxes">
					<div className="login__checkbox">
						<input
							type="checkbox"
							required
							// onClick={() => setIsBox1Checked(!isBox1Checked)}
						/>
						<label>
							J'accepte de recevoir la newsletter de Subs
						</label>
					</div>
					<div className="login__checkbox">
						<input
							type="checkbox"
							required
							onClick={() => setIsBox2Checked(!isBox2Checked)}
						/>
						<label>
							J'accepte les conditions générales d'utilisation
						</label>
					</div>
				</div>

				<div className="login__btn">
					<Button3 disabled={!formIsValid}>
						Terminer ma préinscription
					</Button3>
				</div>
			</form>
			<div className="login__separator"></div>
			<div className="login__footer">
				<p className="login__footer-text">
					Un mail de validation vous sera envoyé afin de valider votre
					préinscription.
					<br />
					Celle-ci ne vous engage pas à une inscription définitive
					lorsque notre service sera disponible. La préinscription
					vous permet d'être tenu au courant de la date de sortie de
					notre service et de pouvoir en profiter dans les premiers et
					avec pleins d'avantages. Votre préinscription compte
					beaucoup pour notre développement.
					<br />
					Toute l'équipe Subs vous remercie d'avance pour votre
					confiance et reste à votre disposition !
					<br />
					<br />
					Besoin d'aide ?{" "}
					<a href="mailto:bonjour@subs.fr">bonjour@subs.fr</a>
				</p>
			</div>
		</div>
	);
}

export default Login;
