import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import useInput from "../hooks/use-input";
import ToastModal from "HOC/ToastModal";
import Input from "HOC/input";
import Button3 from "HOC/button3";

import logo from "images/Logo-white.png";
import error from "images/error.svg";
import mentionsLegales from "images/legal-mentions.pdf";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const baseURL = process.env.REACT_APP_BASE_URL;

const Login = (props) => {
	let history = useHistory();
	const [isBox1Checked, setIsBox1Checked] = useState(false);
	const [isBox2Checked, setIsBox2Checked] = useState(false);
	const [parrainBoxClicked, setParrainBoxClicked] = useState(false);

	const [toastList, setToastList] = useState([]);
	const [hasUserSubmittedForm, setHasUserSubmittedForm] = useState(false);

	const {
		value: firstNameValue,
		isValid: firstNameIsValid,
		hasError: firstNameHasError,
		valueChangedHandler: firstNameChangeHandler,
		inputBlurHandler: firstNameBlurHandler,
		reset: resetFirstName,
	} = useInput(isNotEmpty, "firstName");
	const {
		value: lastNameValue,
		isValid: lastNameIsValid,
		hasError: lastNameHasError,
		valueChangedHandler: lastNameChangeHandler,
		inputBlurHandler: lastNameBlurHandler,
		reset: resetLastName,
	} = useInput(isNotEmpty, "lastName");
	let {
		value: emailValue,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangedHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmail,
	} = useInput(isEmail, "email");

	const [parrainNameValue, setParrainNameValue] = useState("");

	let formIsValid = false;

	if (firstNameIsValid && lastNameIsValid && emailIsValid && isBox2Checked) {
		formIsValid = true;
	}

	const accountChoice = () => {
		let account = 0;
		if (
			sessionStorage.getItem("offre1Clicked") === "true" &&
			sessionStorage.getItem("offre2Clicked") === "true"
		) {
			account = 3;
		} else if (sessionStorage.getItem("offre1Clicked") === "true") {
			account = 1;
		} else if (sessionStorage.getItem("offre2Clicked") === "true") {
			account = 2;
		}
		return account;
	};

	const accountChoosen = accountChoice();

	const submitHandler = (event) => {
		event.preventDefault();

		if (!formIsValid) {
			const failedToast = {
				id: Math.floor(Math.random() * 100),
				title: "Formulaire invalide",
				description: "Veuillez compléter le formulaire",
				icon: error,
				type: "error",
			};
			setToastList((oldToast) => [...oldToast, failedToast]);
			return;
		}

		fetch(baseURL + "/api/users/newuser", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: emailValue,
				name: lastNameValue,
				surname: firstNameValue,
				newsletter: isBox1Checked,
				accountChoice: accountChoosen,
				parrainNameValue: parrainNameValue,
			}),
		}).then((res) => {
			if (res.ok) {
				history.push({
					pathname: "/",
					state: { success: true },
				});
			} else {
				const failedToast = {
					id: Math.floor(Math.random() * 100),
					title: "Il semblerait que",
					description: "vous soyez déjà préinscrit.",
					icon: error,
					type: "error",
				};
				setToastList((oldToast) => [...oldToast, failedToast]);
			}
		});

		resetFirstName();
		resetLastName();
		resetEmail();
		// resetParrainName();
	};

	if (!history.location.state?.failure && hasUserSubmittedForm) {
		const failedToast = {
			id: Math.floor(Math.random() * 100),
			title: "Une erreur est survenue",
			description: "Veuillez vous préinscrire à nouveau",
			icon: error,
			type: "error",
		};
		setToastList((oldToast) => [...oldToast, failedToast]);
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
						<label className="login__label">
							Quel est votre Email:*
						</label>
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
							Quel est votre Nom?*
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
							Quel est votre Prénom?*
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
								<a
									href={mentionsLegales}
									target="_blank"
									rel="noreferrer"
								>
									<u>conditions générales d'utilisation</u>
								</a>
								*
							</label>
						</div>
						<div className="login__checkbox">
							<input
								type="checkbox"
								onClick={() =>
									setParrainBoxClicked(
										parrainBoxClicked ? false : true
									)
								}
							/>
							<label>J'ai un parrain Subs</label>
						</div>
						{parrainBoxClicked ? (
							<div>
								<Input
									id="parrainName"
									name="parrainName"
									placeHolder="Nom et prénom du parrain"
									value={parrainNameValue}
									onChange={(e) =>
										setParrainNameValue(e.target.value)
									}
								/>
								<label>Nom du Parrain</label>
							</div>
						) : null}
					</div>

					<div className="login__btn">
						<Button3>Terminer ma préinscription</Button3>
					</div>
				</form>
				<div className="login__separator"></div>
				<div className="login__footer">
					<p className="login__footer-text">
						Un mail de validation vous sera envoyé afin de valider
						votre préinscription.
						<br />
						Celle-ci ne vous engage pas à une inscription définitive
						lorsque notre service sera disponible.
						<br />
						<b>
							L'inscription définitive ainsi que la sortie de
							notre produit seront conditionnées par l’obtention
							d’une accréditation délivrée par l’Autorité des
							marchés financiers (AMF)
						</b>{" "}
						ainsi que l’Autorité de Contrôle Prudentiel et de
						Résolution (ACPR), afin d’être considéré comme un
						Prestataire de Services sur Actifs Numériques (PSAN).
						Cela représente un gage de qualité et de confiance que
						nous trouvons essentiel avec nos clients.
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
