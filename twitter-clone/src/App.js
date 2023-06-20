import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Navigation from "./Components/Navigation";
import Loading from "./Components/Laoding";

import { authService } from "./firebase";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObj, setUserObj] = useState(null);
	const [init, setInit] = useState(false);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setUserObj({
					displayName: user.displayName,
					uid: user.uid,
					updateProfile: (args) => user.updateProfile(args),
				});

				setIsLoggedIn(true);
			} else {
				setUserObj(null);
			}
			setInit(true);
		});
	}, []);

	const refreshUser = () => {
		const user = authService.currentUser;
		setUserObj({
			displayName: user.displayName,
			uid: user.uid,
			updateProfile: (args) => user.updateProfile(args),
		});
	};

	const logout = () => {
		setIsLoggedIn(false);
		authService.signOut();
	};

	return (
		<>
			{init ? (
				<Router>
					{isLoggedIn && <Navigation user={userObj} />}
					<Switch>
						{isLoggedIn ? (
							<>
								<Route exact path='/'>
									<Home user={userObj} />
								</Route>
								<Route exact path='/profile'>
									<Profile
										user={userObj}
										refreshUser={refreshUser}
										logout={logout}
									/>
								</Route>
							</>
						) : (
							<Route exact path='/'>
								<Auth />
							</Route>
						)}
					</Switch>
				</Router>
			) : (
				<Loading />
			)}
		</>
	);
};

export default App;
