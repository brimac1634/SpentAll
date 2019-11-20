import React, { useState } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import SectionBox from '../../components/section-box/section-box.component';
import FacebookButton from '../../components/facebook-button/facebook-button.component';

import { emailSignInStart } from '../../redux/user/user.actions';

import './sign-in-form.styles.scss';

const mapDispatchToProps = dispatch => ({
	emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password}))
})

const SignInForm = ({ match, history, emailSignInStart }) => {
	const [userCredentials, setCredentials] = useState({email: '', password: ''});
	const { email, password } = userCredentials;

	const handleSubmit = async event => {
		event.preventDefault();
		emailSignInStart(email, password);
	}

	const handleChange = event => {
		const { value, name } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	}

	return (
		<div className='sign-in-form'>
			<SectionBox>
				<h2>Login</h2>
				<form onSubmit={handleSubmit}>
					<FormInput 
						name='email' 
						type='email' 
						value={email} 
						label='email'
						handleChange={handleChange}
						required 
					/>
					<FormInput 
						name='password' 
						type='password' 
						value={password} 
						label='password'
						handleChange={handleChange}
						required 
					/>
					<Link to={'welcome/reset-account'} className='forgot'>forgot password?</Link>
					<div className='column'>
						<CustomButton 
							selected
							type='submit'
						> 
							Sign In 
						</CustomButton>
						<span className='or-span'>OR</span>
						<FacebookButton label='Login With Facebook' />
					</div>
				</form>
				<div className='new'>
				    <CustomButton 
						selected
						onClick={()=>history.push('/welcome/sign-up')}
					> 
						I'm new! 
					</CustomButton>
				</div>
			</SectionBox>
		</div>
	)
}

export default withRouter(connect(null, mapDispatchToProps)(SignInForm));