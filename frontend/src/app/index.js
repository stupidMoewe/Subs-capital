import React from "react";
import { Switch, Route } from "react-router-dom";

import Router from "../Components/Router";
import MainPage from "../Components/MainPage/MainPage";

import "../sass/main.scss";

const Login = React.lazy(() => import("../Components/Login/Login"));
const Choices = React.lazy(() => import("../Components/Login/Choices"));
const Article = React.lazy(() => import("../Components/Article/Article"));
const ArticleForm = React.lazy(() =>
	import("../Components/Article/ArticleForm")
);
const ErrorPage = React.lazy(() => import("../Components/MainPage/ErrorPage"));

class App extends React.Component {
	render() {
		return (
			<React.Suspense fallback={<span>Chargement de la page</span>}>
				<Router>
					<div className="container">
						<Switch>
							<Route
								path="/preinscription"
								component={Login}
								exact
							/>
							<Route path="/choix" component={Choices} exact />
							<Route
								path="/article/new"
								component={ArticleForm}
								exact
							/>
							<Route
								path="/article/:id"
								component={Article}
								exact
							/>
							<Route
								path="/"
								component={MainPage}
								exact
								// render={(props) => (
								// 	<MainPage
								// 		{...props}
								// 		registrationSucceed={
								// 			this.state.registrationSucceed
								// 		}
								// 	/>
								// )}
							/>
							<Route path="/" component={ErrorPage} />
						</Switch>
					</div>
				</Router>
			</React.Suspense>
		);
	}
}

export default App;
