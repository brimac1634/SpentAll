import React, { useState } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import Carousel from '../carousel/carousel.component';
import Loader from '../loader/loader.component';
import FormInput from '../form-input/form-input.component';
import Preferences from '../preferences/preferences.component';
import Categories from '../categories/categories.component';

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
		password: '',
		currency: '',
		target: '',
		cycle: 'monthly',
		categories: ['food', 'housing', 'transportation', 'travel', 'entertainment', 'clothing', 'groceries', 'utilities', 'health', 'education', 'work']
	});
	const { name, email, password } = userCredentials;

	const handleSubmit = async event => {
		event.preventDefault();
		console.log(userCredentials)
	}

	const handleChange = event => {
		const { value, name } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	}

	return (
		<div className='sign-up-form'>
			<Carousel showIndicator submit={handleSubmit}>
				<div className='item'>
					<div className='container'>
						<h2>User Details</h2>
						<form>
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
				<div className='item'>
					<div className='container'>
						<h2>Settings</h2>
						<Preferences 
							settings={userCredentials}
							handleChange={handleChange}
							setSettings={setCredentials}
						/>
					</div>
				</div>
				<div className='item'>
					<div className='container'>
						<h2>Categories</h2>
						<Categories
							settings={userCredentials}
							setSettings={setCredentials}
						/>
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