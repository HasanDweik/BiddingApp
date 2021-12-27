import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loading from '../Components/Loader/Loading';
const Login = lazy(() => import('./LoginPage/Login'));
const SignUp = lazy(() => import('./SignupPage/Signup'));
const Main = lazy(() => import('./MainPage/Main'));

function RootPage() {
	return (
		<Suspense fallback={<Loading />}>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/main" exact component={Main} />
				<Route path="/login" exact component={Login} />
				<Route path="/signup" exact component={SignUp} />
			</Switch>
		</Suspense>
	);
}

export default RootPage;
