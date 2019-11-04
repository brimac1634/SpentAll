import React, { useState } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { validateEmail } from '../../utils';

import { selectMessage } from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import HoverBox from '../../components/hover-box/hover-box.component';
import MessageModal from '../../components/message-modal/message-modal.component';

import { resetStart, emailSignUpStart, signUpSuccess } from '../../redux/user/user.actions';

import './sign-up-form.styles.scss';

const mapStateToProps = createStructuredSelector({
	signUpMessage: selectMessage
})

const mapDispatchToProps = dispatch => ({
	emailSignUpStart: (name, email) => dispatch(emailSignUpStart({ name, email })),
	resetStart: email => dispatch(resetStart({ email })),
	setSignUpMessage: message => dispatch(signUpSuccess(message))
})

const SignUpForm = ({ isReset, emailSignUpStart, resetStart, signUpMessage, setSignUpMessage }) => {
	const [userCredentials, setCredentials] = useState({name: '', email: ''});
	const [showMessage, setshowMessage] = useState(true);
	const { name, email } = userCredentials;


	const handleSubmit = async event => {
		event.preventDefault();
		if (isReset) {
			resetStart(email);
		} else {
			emailSignUpStart(name, email);
		}
	}

	const handleChange = event => {
		const { value, name } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	}

	const handleMessage = () => {
		setshowMessage(false);
		setTimeout(()=>setSignUpMessage(null), 100)
		setTimeout(()=>setshowMessage(true), 200)
	}

	return (
		<div className='sign-up-form'>
			<h2>{isReset ? 'Password Reset' : 'Sign Up'}</h2>
			<form onSubmit={handleSubmit}>
				{
					!isReset &&
					<FormInput 
						name='name' 
						type='text' 
						value={name} 
						label='name'
						handleChange={handleChange}
						required 
					/>
				}
				<FormInput 
					name='email' 
					type='email' 
					value={email} 
					label='email'
					handleChange={handleChange}
					required 
				/>
				<div className='buttons'>
					<CustomButton 
						disabled={!name || !validateEmail(email)}
						selected
						type='submit'
					> 
						{isReset ? 'reset' : 'sign up'} 
					</CustomButton>
				</div>
			</form>
			<HoverBox show={!!signUpMessage && showMessage}>
				<MessageModal
					title='success'
					message={signUpMessage}
					confirm='okay' 
					confirmCallback={handleMessage}
				/>
			</HoverBox>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);