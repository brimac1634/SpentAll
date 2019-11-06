import React, { useState } from 'react';
import { connect } from 'react-redux'

import Carousel from '../carousel/carousel.component';
import Preferences from '../preferences/preferences.component';
import Categories from '../categories/categories.component';

import { updateSettingsStart } from '../../redux/user/user.actions';

import './new-settings.styles.scss';

const mapDispatchToProps = dispatch => ({
	updateSettings: settings => dispatch(updateSettingsStart(settings))
})

const NewSettings = ({ updateSettings }) => {
	const [userCredentials, setCredentials] = useState({
		currency: '',
		target: '',
		cycle: 'monthly',
		categories: ['food', 'housing', 'transportation', 'travel', 'entertainment', 'clothing', 'groceries', 'utilities', 'health', 'education', 'work']
	});
	const [index, setIndex] = useState(0);

	const { categories } = userCredentials;

	const handleSubmit = async event => {
		event.preventDefault();
		updateSettings(userCredentials);
	}

	const handleChange = event => {
		const { value, name } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	}

	const disableNext = index => {
		switch (index) {
			case 0:
				return Object.values(userCredentials).some(item => {
					return !item || item === '';
				})
			case 1:
				return !!!categories.length
			default:
				return true
		}
	}

	return (
		<div className='new-settings'>
			<Carousel 
				showIndicator 
				submit={handleSubmit}
				handleIndex={setIndex}
				disableNext={disableNext(index)}
			>
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
		</div>
	)
}

export default connect(null, mapDispatchToProps)(NewSettings);