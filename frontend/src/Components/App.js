import React from "react";
import { Switch, Route } from "react-router-dom";

import Router from "./Router";
import MainPage from "./MainPage/MainPage";

import "../sass/main.scss";

const Login = React.lazy(() => import("./Login/Login"));
const Article = React.lazy(() => import("./Article"));
const ErrorPage = React.lazy(() => import("./MainPage/ErrorPage"));


class App extends React.Component {
	render() {
		return (
			<React.Suspense fallback={<span>Loading...</span>}>
				<Router>
					<div className="container">
						<Switch>
							<Route
								path="/preinscription"
								component={Login}
								exact
							/>
							<Route
								path="/article/:id"
								component={Article}
								exact
							/>
							<Route path="/" component={MainPage} exact />
							<Route path="/" component={ErrorPage} />
						</Switch>
					</div>
				</Router>
			</React.Suspense>
		);
	}
}

export default App;
