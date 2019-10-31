import React, { useState } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { withRouter, Link } from 'react-router-dom';

import Loader from '../loader/loader.component';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { emailSignInStart } from '../../redux/user/user.actions';
import { selectIsUserFetching } from '../../redux/user/user.selectors';

import './sign-in-form.styles.scss';

const mapStateToProps = createStructuredSelector({
	isLoadingUser: selectIsUserFetching
})

const mapDispatchToProps = dispatch => ({
	emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password}))
})

const SignInForm = ({ match, emailSignInStart, isLoadingUser }) => {
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
				<Link to={`${match.path}/sign-up`} className='forgot'>forgot password?</Link>
				<div className='buttons'>
					<CustomButton 
						selected
						type='submit'
					> 
						Sign In 
					</CustomButton>
				</div>
			</form>
			{
				isLoadingUser &&
				<Loader />
			}
		</div>
	)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInForm));