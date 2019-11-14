import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import Carousel from '../carousel/carousel.component';
import Preferences from '../preferences/preferences.component';
import Categories from '../categories/categories.component';
import HoverBox from '../hover-box/hover-box.component';
import MessageModal from '../../components/message-modal/message-modal.component';

import { updateSettingsStart, signOutStart } from '../../redux/user/user.actions';

import './new-settings.styles.scss';

const mapDispatchToProps = dispatch => ({
	updateSettings: settings => dispatch(updateSettingsStart(settings)),
	logout: () => dispatch(signOutStart())
})

const NewSettings = ({ updateSettings, logout }) => {
	const [userCredentials, setCredentials] = useState({
		currency: '',
		target: '',
		cycle: 'monthly',
		categories: ['food', 'housing', 'transportation', 'travel', 'entertainment', 'clothing', 'groceries', 'utilities', 'health', 'education', 'work']
	});
	const [index, setIndex] = useState(0);
	const [showAlert, setShowAlert] = useState(false);

	useEffect(()=>{
		setTimeout(()=>{
			setShowAlert(true);
		}, 200)
	}, [setShowAlert])

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
				cancel={logout}
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
					<div className='container cats'>
						<h2>Categories</h2>
						<Categories
							settings={userCredentials}
							setSettings={setCredentials}
						/>
					</div>
				</div>
			</Carousel>
			<HoverBox 
				show={showAlert} 
				backgroundClick={e=>{
					e.stopPropagation();
					setShowAlert(false);
				}}
			>
				<MessageModal
					title='Your Settings'
					message={'Before proceeding, you must choose your default settings. Don\'t worry, you can change these settings at any time afterwards!'}
					confirm='okay' 
					confirmCallback={()=>setShowAlert(false)}
				/>
			</HoverBox>
		</div>
	)
}

export default connect(null, mapDispatchToProps)(NewSettings);