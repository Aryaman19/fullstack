import React, { useState } from "react";
import { authService } from "../firebase";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");

	const onSubmit = async (event) => {
		event.preventDefault();

		try {
			let data;
			if (newAccount) {
				data = await authService.createUserWithEmailAndPassword(
					email,
					password
				);
				setError("");
			} else {
				data = await authService.signInWithEmailAndPassword(
					email,
					password
				);
				setError("");
			}
		} catch (error) {
			setError(error.message);
		}
	};

	const onChange = (event) => {
		const {
			target: { name, value },
		} = event;

		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	const toggleAccount = () => setNewAccount((prev) => !prev);

	return (
		<>
			<form onSubmit={onSubmit} className='container'>
				<input
					name='email'
					type='email'
					placeholder='Email'
					required
					value={email}
					onChange={onChange}
					className='authInput'
				/>
				<input
					name='password'
					type='password'
					placeholder='Password'
					required
					value={password}
					className='authInput'
					onChange={onChange}
				/>
				<input
					type='submit'
					className='authInput authSubmit'
					value={newAccount ? "Create Account" : "Sign In"}
				/>
				{error && <span className='authError'>{error}</span>}
			</form>
			<span onClick={toggleAccount} className='authSwitch'>
				{newAccount ? "Sign In" : "Create Account"}
			</span>
		</>
	);
};

export default Auth;
