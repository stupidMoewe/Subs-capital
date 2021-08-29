import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import useInput from "../hooks/use-input";
import ToastModal from "../../HOC/ToastModal";

import Input from "../../HOC/input";
import logo from "../../images/Logo-white.png";
import error from "../../images/error.svg";
import Button3 from "../../HOC/button3";
import mentionsLegales from "../../images/legal-mentions.pdf";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const baseURL = process.env.REACT_APP_BASE_URL;

const Login = (props) => {
	let history = useHistory();
	const [isBox1Checked, setIsBox1Checked] = useState(false);
	const [isBox2Checked, setIsBox2Checked] = useState(false);

	const [toastList, setToastList] = useState([]);
	const [showFailedToast, setShowFailedToast] = useState(false);
	const [hasShownToast, setHasShownToast] = useState(false);
	const [hasUserSubmittedForm, setHasUserSubmittedForm] = useState(false);

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

	if (firstNameIsValid && lastNameIsValid && emailIsValid && isBox2Checked) {
		formIsValid = true;
	}

	if (sessionStorage.getItem("email")) {
		emailValue = sessionStorage.getItem("email");
	}

	const accountChoice = () => {
		let account = 0;
		if (
			sessionStorage.getItem("offre1Clicked") == "true" &&
			sessionStorage.getItem("offre2Clicked") == "true"
		) {
			account = 3;
		} else if (sessionStorage.getItem("offre1Clicked") == "true") {
			account = 1;
		} else if (sessionStorage.getItem("offre2Clicked") == "true") {
			account = 2;
		}
		return account;
	};

	const accountChoosen = accountChoice();

	const submitHandler = (event) => {
		event.preventDefault();

		if (!formIsValid) {
			return;
		}

		fetch(baseURL + "/users/newuser", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: emailValue,
				name: lastNameValue,
				surname: firstNameValue,
				newsletter: isBox1Checked,
				accountChoice: accountChoosen,
			}),
		}).then((res) => {
			if (res.ok) {
				history.push({
					pathname: "/",
					state: { success: true },
				});
				setShowFailedToast(false);
			} else {
				history.push({
					pathname: "/preinscription",
					state: { failure: true },
				});
				setShowFailedToast(true);
			}
		});

		setHasUserSubmittedForm(true);

		resetFirstName();
		resetLastName();
		resetEmail();
	};

	if (
		!history.location.state?.failure &&
		!hasShownToast &&
		hasUserSubmittedForm
	) {
		const failedToast = {
			id: Math.floor(Math.random() * 100),
			title: "Une erreur est survenue",
			description: "Veuillez vous préinscrire à nouveau",
			icon: error,
			type: "error",
		};
		setToastList((oldToast) => [...oldToast, failedToast]);
		setHasShownToast(true);
	}

	return (
		<>
			<div className="login">
				<a href="/">
					<img src={logo} className="login__img" alt="logo-subs" />
				</a>
				<h2 className="login__title">Se préinscrire gratuitement</h2>

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
						<label className="login__label">
							Quel est votre Nom?
						</label>
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
						<div className="login__label">
							Quel est votre prénom?
						</div>
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
								onClick={() => setIsBox1Checked(!isBox1Checked)}
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
								J'accepte les{" "}
								<a href={mentionsLegales} target="_blank">
									<u>conditions générales d'utilisation</u>
								</a>
								*
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
						Un mail de validation vous sera envoyé afin de valider
						votre préinscription.
						<br />
						Celle-ci ne vous engage pas à une inscription définitive
						lorsque notre service sera disponible. L'inscription
						définitive et la sortie de notre produit sera
						conditionné par le nombre de préinscriptions récolté.
						<br />
						La préinscription vous permet d'être tenu au courant de
						la date de sortie de notre service et de pouvoir en
						profiter dans les premiers et avec pleins d'avantages.
						Votre préinscription compte beaucoup pour notre
						développement.
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
			<ToastModal toastList={toastList} />
		</>
	);
};

export default Login;
