import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import { selectMessage } from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import HoverBox from '../../components/hover-box/hover-box.component';
import MessageModal from '../../components/message-modal/message-modal.component';

import { emailSignUpStart, signUpSuccess } from '../../redux/user/user.actions';

import './sign-up-form.styles.scss';

const mapStateToProps = createStructuredSelector({
	signUpMessage: selectMessage
})

const mapDispatchToProps = dispatch => ({
	emailSignUpStart: (name, email) => dispatch(emailSignUpStart({ name, email })),
	setSignUpMessage: message => dispatch(signUpSuccess(message))
})

const SignUpForm = ({ location, emailSignUpStart, signUpMessage, setSignUpMessage }) => {
	const [userCredentials, setCredentials] = useState({name: '', email: ''});
	const { name, email } = userCredentials;

	console.log(location.pathname)

	const handleSubmit = async event => {
		event.preventDefault();
		emailSignUpStart(name, email);
	}

	const handleChange = event => {
		const { value, name } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	}

	return (
		<div className='sign-up-form'>
			<h2>Sign Up</h2>
			<form onSubmit={handleSubmit}>
				<FormInput 
					name='name' 
					type='text' 
					value={name} 
					label='name'
					handleChange={handleChange}
					required 
				/>
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
						selected
						type='submit'
					> 
						sign up 
					</CustomButton>
				</div>
			</form>
			<HoverBox show={!!signUpMessage}>
				<MessageModal
					title='success'
					message={signUpMessage}
					confirm='okay' 
					confirmCallback={()=>setSignUpMessage(null)}
				/>
			</HoverBox>
		</div>
	)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm));