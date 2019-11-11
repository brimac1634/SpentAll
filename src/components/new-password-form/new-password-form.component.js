import React, { useState } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { registerStart } from '../../redux/user/user.actions';

import NewPassword from '../new-password/new-password.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import SectionBox from '../../components/section-box/section-box.component';

import './new-password-form.styles.scss';

const mapDispatchToProps = dispatch => ({
	setNewPassword: (password, token) => dispatch(registerStart({ password, token }))
})

const NewPasswordForm = ({ location, history, setNewPassword }) => {
	const [passwords, setPasswords] = useState({
		firstPassword: '',
		secondPassword: ''
	})
	const [passwordError, setPasswordError] = useState(true);
	const { firstPassword } = passwords;

	const parsed = queryString.parse(location.search);
	const { token } = parsed;
	if (!token) history.push('/welcome');

	const handleSubmit = async event => {
		event.preventDefault();
		setNewPassword(firstPassword, token);
	} 

	const handleChange = event => {
		const { value, name } = event.target;
		setPasswords({ ...passwords, [name]: value });
	}

	return (
		<div className='new-password-form'>
			<SectionBox>
				<NewPassword
					passwords={passwords}
					handleChange={handleChange}
					passwordError={passwordError}
					setPasswordError={setPasswordError}
				/>
				<div className='column'>
					<CustomButton 
						disabled={!!passwordError}
						selected 
						onClick={handleSubmit}
					> 
						submit
					</CustomButton>
				</div>
			</SectionBox>
		</div>
	)
}

export default withRouter(connect(null, mapDispatchToProps)(NewPasswordForm));