import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas } from '../../utils';

import { selectUserSettings } from '../../redux/user/user.selectors';
import { updateSettingsStart } from '../../redux/user/user.actions'; 

import CustomButton from '../custom-button/custom-button.component';
import Category from '../category/category.component';
import Preferences from '../preferences/preferences.component';
import Categories from '../categories/categories.component';

import './settings.styles.scss';

const mapStateToProps = createStructuredSelector({
	userSettings: selectUserSettings
})

const mapDispatchToProps = dispatch => ({
	updateSettings: settings => dispatch(updateSettingsStart(settings)),
})

const Settings = ({ updateSettings, userSettings }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [settings, setSettings] = useState({
		target: userSettings.target,
		cycle: userSettings.cycle,
		currency: userSettings.currency,
		categories: userSettings.categories
	});

	useEffect(()=>{
		setSettings(userSettings);
		setIsEditing(false)
	}, [setSettings, userSettings])

	let { target, cycle, currency, categories } = settings;

	const updateProfile = async settings => {
		updateSettings({
			...settings,
			target: Number(target).toFixed(0),
			categories: categories.join(',')
		});
	}

	const handleChange = event => {
		let { value, name } = event.target;
		setSettings({ ...settings, [name]: value });
	}

	return (
		<div className='settings'>
			<div className='top-bar'>
				<h3>Settings</h3>
				<CustomButton
					selected={!isEditing}
					onClick={()=>setIsEditing(!isEditing)}
				> 
					{isEditing ? 'cancel' : 'edit'} 
				</CustomButton>
			</div>
			{
				!isEditing &&
				<div className='edit-group'>
					<div className='sub-group'>
						<span className='label'>currency: </span>
						<span>{currency}</span>
					</div>
					<div className='sub-group'>
						<span className='label'>spending limit: </span>
						<span>{currency}{numberWithCommas(target, false)}</span>
					</div>
					<div className='sub-group'>
						<span className='label'>spending cycle: </span>
						<span>{cycle}</span>
					</div>
					<div className='sub-group'>
						<span className='label'>categories: </span>
						<div className='categories'>
							{
								categories &&
								categories.map((category, i)=>(
									<Category 
										key={i}
										category={category}
									/>
								))
							}
						</div>
					</div>
				</div>
			}
			{
				isEditing &&
				<div className='edit-group'>
					<Preferences 
						settings={settings}
						handleChange={handleChange}
						setSettings={setSettings}
					/>
					<Categories
						settings={settings}
						setSettings={setSettings}
					/>
					<div className='sub-group'>
						<CustomButton
							selected
							onClick={()=>updateProfile(settings)}
						> 
							update 
						</CustomButton>
					</div>
				</div>
			}
		</div>
	)
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);