import React from "react";
import Authform from "../Components/Authform";
import { firebaseInstance, authService } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTwitter,
	faGoogle,
	faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
	const onClick = async (event) => {
		const {
			target: { name },
		} = event;
		try {
			let provider;
			if (name === "google") {
				provider = new firebaseInstance.auth.GoogleAuthProvider();
			} else if (name === "github") {
				provider = new firebaseInstance.auth.GithubAuthProvider();
			}
			await authService.signInWithPopup(provider);
		} catch (error) {}
	};

	return (
		<div className='authContainer'>
			<FontAwesomeIcon
				icon={faTwitter}
				color={"#04AAFF"}
				size='3x'
				style={{ marginBottom: 30 }}
			/>
			<Authform />
			<div className='authBtns'>
				<button
					onClick={onClick}
					name='google'
					className='authBtn'>
					Continue with Google <FontAwesomeIcon icon={faGoogle} />
				</button>
				<button
					onClick={onClick}
					name='github'
					className='authBtn'>
					Continue with Github <FontAwesomeIcon icon={faGithub} />
				</button>
			</div>
		</div>
	);
};

export default Auth;
