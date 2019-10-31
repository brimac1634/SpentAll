import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';

import Carousel from '../carousel/carousel.component';
import Loader from '../loader/loader.component';
import FormInput from '../form-input/form-input.component';
import Preferences from '../preferences/preferences.component';
import Categories from '../categories/categories.component';

import { registerStart } from '../../redux/user/user.actions';
import { selectIsUserFetching, selectUserError } from '../../redux/user/user.selectors';

import { validatePassword } from '../../utils';

import './register.styles.scss';

const mapStateToProps = createStructuredSelector({
	isLoadingUser: selectIsUserFetching,
	userError: selectUserError
})

const mapDispatchToProps = dispatch => ({
	registerStart: (password, token, settings) => dispatch(registerStart({ password, token, settings }))
})

const Register = ({ history, location, registerStart, isLoadingUser, userError }) => {
	const [userCredentials, setCredentials] = useState({
		firstPassword: '',
		secondPassword: '',
		currency: '',
		target: '',
		cycle: 'monthly',
		categories: ['food', 'housing', 'transportation', 'travel', 'entertainment', 'clothing', 'groceries', 'utilities', 'health', 'education', 'work']
	});
	const parsed = queryString.parse(location.search);
	const { token } = parsed;
	if (!token) history.push('/welcome');

	const { firstPassword, secondPassword } = userCredentials;

	const handleSubmit = async event => {
		event.preventDefault();
		registerStart(firstPassword, token, userCredentials);
	}

	const handleChange = event => {
		const { value, name } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	}
	// validatePassword

	return (
		<div className='register'>
			<Carousel showIndicator submit={handleSubmit}>
				<div className='item'>
					<div className='container'>
						<h2>User Details</h2>
						<form>
							<FormInput 
								name='firstPassword' 
								type='password' 
								value={firstPassword} 
								label='password'
								handleChange={handleChange}
								required 
							/>
							<FormInput 
								name='secondPassword' 
								type='password' 
								value={secondPassword} 
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));