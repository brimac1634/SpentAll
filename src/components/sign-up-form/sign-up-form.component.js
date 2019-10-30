import React, { useState } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import Carousel from '../carousel/carousel.component';
import Loader from '../loader/loader.component';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import Settings from '../settings/settings.component';

import { emailSignInStart } from '../../redux/user/user.actions';
import { selectIsUserFetching, selectUserError } from '../../redux/user/user.selectors';

import './sign-up-form.styles.scss';

const mapStateToProps = createStructuredSelector({
	isLoadingUser: selectIsUserFetching,
	userError: selectUserError
})

const mapDispatchToProps = dispatch => ({
	emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password}))
})

const SignUpForm = ({ emailSignInStart, isLoadingUser, userError }) => {
	const [userCredentials, setCredentials] = useState({
		name: '',
		email: '', 
		password: ''
	});
	const { name, email, password } = userCredentials;

	const handleSubmit = async event => {
		event.preventDefault();
		emailSignInStart(email, password);
	}

	const handleChange = event => {
		const { value, name } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	}

	return (
		<div className='sign-up-form'>
			<Carousel showIndicator>
				<div className='item'>
					<div className='details'>
						<h2>Register</h2>
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
							<FormInput 
								name='password' 
								type='password' 
								value={password} 
								label='password'
								handleChange={handleChange}
								required 
							/>
							<span className={`error ${userError ? 'show' : null}`}>{userError ? userError.title : ''}</span>
						</form>
					</div>
				</div>
				<div className='item'></div>
				<div className='item'>
					<div className='buttons'>
						<CustomButton 
							selected
							type='submit'
						> 
							register 
						</CustomButton>
					</div>
				</div>
			</Carousel>
			{
				isLoadingUser &&
				<Loader />
			}
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);