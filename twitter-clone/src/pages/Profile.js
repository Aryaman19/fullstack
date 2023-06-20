import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, user, logout }) => {
	const history = useHistory();
	const [newDisplayName, setNewDisplayName] = useState(user.displayName);

	const onLogOutClick = () => {
		logout();
		history.push("/");
	};
	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewDisplayName(value);
	};
	
	const onSubmit = async (event) => {
		event.preventDefault();
		if (user.displayName !== newDisplayName) {
			await user.updateProfile({
				displayName: newDisplayName,
			});
			refreshUser();
		}
	};
	return (
		<div className='container'>
			<form onSubmit={onSubmit} className='profileForm'>
				<input
					onChange={onChange}
					type='text'
					autoFocus
					placeholder='Display name'
					value={newDisplayName}
					className='formInput'
				/>
				<input
					type='submit'
					value='Update Profile'
					className='formBtn'
					style={{
						marginTop: 10,
					}}
				/>
			</form>
			<span className='formBtn cancelBtn logOut' onClick={onLogOutClick}>
				Log Out
			</span>
		</div>
	);
};
