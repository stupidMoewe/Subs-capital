import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "../Components/MainPage/MainPage";
import Router from "../Components/Router";
import Spinner from "../HOC/spinner";

// import "../sass/main.scss";

const Login = React.lazy(() => import("../Components/Login/Login"));
const Choices = React.lazy(() => import("../Components/Login/Choices"));
const Confirmation = React.lazy(() =>
	import("../Components/Login/Confirmation")
);
const Code = React.lazy(() => import("../Components/Portfolio/Code"));
const Portfolio = React.lazy(() => import("../Components/Portfolio/Portfolio"));
const ErrorPage = React.lazy(() => import("../Components/MainPage/ErrorPage"));

const App = () => {
	return (
		<React.Suspense fallback={<span>Chargement de la page</span>}>
			<Router>
				<div className="container">
					<Switch>
						<Route path="/preinscription" component={Login} exact />
						<Route
							path="/confirmation"
							component={Confirmation}
							exact
						/>
						<Route path="/spinner" component={Spinner} exact />
						<Route path="/choix" component={Choices} exact />
						<Route path="/portfolio" component={Portfolio} exact />
						{/* <Route path="/portfolio" component={Code} /> */}
						<Route path="/" component={MainPage} exact />
						<Route path="/" component={ErrorPage} />
					</Switch>
				</div>
			</Router>
		</React.Suspense>
	);
};

export default App;
