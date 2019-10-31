import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import NewPassword from '../new-password-form/new-password-form.component';

const NewPasswordForm = ({ location, history }) => {
	const [passwords, setPasswords] = useState({
		firstPassword: '',
		secondPassword: ''
	})
	const [passwordError, setPasswordError] = useState(null);

	const parsed = queryString.parse(location.search);
	const { token } = parsed;
	if (!token) history.push('/welcome');

	const handleChange = event => {
		const { value, name } = event.target;
		setPasswords({ ...passwords, [name]: value });
	}

	return (
		<div className='new-password-form'>
			<NewPassword
				passwords={passwords}
				handleChange={handleChange}
				passwordError={passwordError}
				setPasswordError={setPasswordError}
			/>
		</div>
	)
}

export default withRouter(NewPasswordForm);