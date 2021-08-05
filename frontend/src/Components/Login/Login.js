import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Input from "../../HOC/input";
import logo from "../../images/Logo.png";
import Button2 from "../../HOC/button2";

class Login extends Component {
	state = {
		name: "",
		isNameValid: true,
		email: "",
		isEmailValid: true,
		surname: "",
		isSurnameValid: true,
		redirect: false,
		formSubmited: false,
		formValid: false,
		isModalOpened: false,
	};

	nameHandleChange = (event) => {
		this.setState({ name: event.target.value }, () => {
			if (this.state.formSubmited) {
				this.checkInputs();
			}
		});
	};
	emailHandleChange = (event) => {
		this.setState({ email: event.target.value }, () => {
			if (this.state.formSubmited) {
				this.checkInputs();
			}
		});
	};
	surnameHandleChange = (event) => {
		this.setState({ surname: event.target.value }, () => {
			if (this.state.formSubmited) {
				this.checkInputs();
			}
		});
	};

	checkInputs = () => {
		if (!this.state.isNameValid) {
			if (this.nameChecker) {
				this.setState({ isNameValid: true });
			}
		}
		if (!this.state.isEmailValid) {
			if (this.emailChecker) {
				this.setState({ isEmailValid: true });
			}
		}
		if (!this.state.isSurnameValid) {
			if (this.surnameChecker) {
				this.setState({ isSurnameValid: true });
			}
		}
		if (this.state.isNameValid) {
			if (!this.nameChecker) {
				this.setState({ isNameValid: false });
			}
		}
		if (this.state.isEmailValid) {
			if (!this.emailChecker) {
				this.setState({ isEmailValid: false });
			}
		}
		if (this.state.isSurnameValid) {
			if (!this.surnameChecker) {
				this.setState({ isSurnameValid: false });
			}
		}
		if (
			this.state.isEmailValid &&
			this.state.isNameValid &&
			this.state.isSurnameValid
		) {
			this.setState({ formValid: true });
		}
	};

	emailChecker = () => {
		if (this.state.email.length > 1) {
			return true;
		}
		return false;
	};
	nameChecker = () => {
		if (this.state.name.length > 1) {
			return true;
		}
		return false;
	};
	surnameChecker = () => {
		if (this.state.surname.length > 1) {
			return true;
		}
		return false;
	};

	formSubmitHandler = () => {
		fetch("https://immense-cove-66864.herokuapp.com/api/users/newuser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: this.state.email,
				name: this.state.name,
				surname: this.state.surname,
			}),
		})
			.then((result) => {
				result.json();
			})
			.then((info) => {
				console.log(info);
			});
	};

	// email: "testtesterman@gmail.com",
	// 			name: "testtest",
	// 			surname: "testtest",

	// renderErrMessage = () => {
	// 	let errMessage = <div className="login__btn-errMesage"></div>;
	// 	if (!this.state.formValid && this.state.formSubmited) {
	// 		errMessage = (
	// 			<div className="login__btn-errMesage">
	// 				Merci de compléter correctement le formulaire
	// 			</div>
	// 		);
	// 	}
	// 	return errMessage;
	// };

	render() {
		if (this.state.redirect) {
			return <Redirect to="/" />;
		}
		return (
			<div className="login">
				<a href="/">
					<img src={logo} className="login__img" alt="logo-subs" />
				</a>
				<h2 className="login__title">Se préinscrire gratuitement.</h2>

				<form className="form" onSubmit={this.formSubmitHandler}>
					<div className="login__field">
						<div className="login__label">Email:</div>
						<Input
							placeHolder="Email"
							value={this.state.value}
							onChange={this.emailHandleChange}
							error={this.state.isEmailValid}
						/>
						<div />
					</div>
					<div className="login__field">
						<div className="login__label">Quel est votre Nom?</div>
						<Input
							placeHolder="Nom"
							value={this.state.value}
							onChange={this.nameHandleChange}
							error={this.state.isNameValid}
						/>
					</div>
					<div className="login__field">
						<div className="login__label">
							Quel est votre prénom?
						</div>
						<Input
							placeHolder="Prénom"
							value={this.state.value}
							onChange={this.surnameHandleChange}
							error={this.state.isSurnameValid}
						/>
					</div>
					<div className="login__checkboxes">
						<div className="login__checkbox">
							<input type="checkbox" required />
							<label>
								J'accepte de recevoir la newsletter de Subs
							</label>
						</div>
						<div className="login__checkbox">
							<input type="checkbox" required />
							<label>
								J'accepte les conditions générales d'utilisation
							</label>
						</div>
					</div>

					<div className="login__btn">
						<Button2
							text="Terminer ma préinscription"
							type="blue"
							onClick={this.formSubmitHandler}
						/>
					</div>
				</form>
				<div className="login__separator"></div>
				<div className="login__footer">
					<p className="login__footer-text">
						Un email de validation vous sera envoyé. Votre
						préinscription ne vous engage pas à une insciption
						définitive lorsque notre service sera disponible. La
						préinscription vous permets d'être tenu au courant de la
						date de sortie de notre service et de pouvir en profiter
						dans les prenmiers et avec pleins d'avantages. Votre
						préiscription compte beaucoup pour notre
						commercialisation. Toute l'équipe Subs vous remercie
						d'avance pour votre confiance et reste à votre
						disposition !
					</p>
				</div>
			</div>
		);
	}
}

export default Login;
