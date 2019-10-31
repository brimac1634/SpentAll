import React, { useState, useEffect } from 'react';
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
	const [index, setIndex] = useState(0);
	const [passwordError, setPasswordError] = useState(null);

	const parsed = queryString.parse(location.search);
	const { token } = parsed;
	if (!token) history.push('/welcome');

	const { firstPassword, secondPassword, categories } = userCredentials;

	const handleSubmit = async event => {
		event.preventDefault();
		registerStart(firstPassword, token, {
			...userCredentials,
			categories: categories.join(',')
		});
	}

	const handleChange = event => {
		const { value, name } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	}

	useEffect(()=>{
		let error;
		if (!validatePassword(firstPassword)) {
			error = '*password must have at least 8 characters*';
		} else if (firstPassword !== secondPassword) {
			error = '*passwords do not match*'
		} else {
			error = null;
		}
		setPasswordError(error);
	}, [firstPassword, secondPassword, setPasswordError])

	const disableNext = index => {
		switch (index) {
			case 0:
				return !!passwordError
			case 1:
				return Object.values(userCredentials).some(item => {
					return !item || item === '';
				})
			case 2:
				return !!!categories.length
			default:
				return true
		}
	}

	return (
		<div className='register'>
			<Carousel 
				showIndicator 
				submit={handleSubmit}
				handleIndex={setIndex}
				disableNext={disableNext(index)}
			>
				<div className='item'>
					<div className='container'>
						<h2>Password</h2>
						<form>
							<div className='input-group'>
								<span className='label'>create a new password</span>
								<FormInput 
									name='firstPassword' 
									type='password' 
									value={firstPassword} 
									label='password'
									handleChange={handleChange}
									required 
								/>
							</div>
							<div className='input-group'>
								<span className='label'>rewrite your new password</span>
								<FormInput 
									name='secondPassword' 
									type='password' 
									value={secondPassword} 
									label='password'
									handleChange={handleChange}
									required 
								/>
							</div>
							<span className={`error ${passwordError ? 'show' : 'hide'}`}>
								{passwordError}
							</span>
						</form>
					</div>
				</div>
				<div className='item'>
					<div className='container'>
						<h2>Settings</h2>
						<span className='error show'>
							all items must be filled
						</span>
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