import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axiosConfig from '../../axios-config';
import { numberWithCommas } from '../../utils';

import { selectUserSettings } from '../../redux/user/user.selectors';
import { setAlert } from '../../redux/alert/alert.actions'; 
import { setUserSettings } from '../../redux/user/user.actions'; 
import { startLoading, stopLoading } from '../../redux/loading/loading.actions'; 

import CustomButton from '../custom-button/custom-button.component';
import Category from '../category/category.component';
import Preferences from '../preferences/preferences.component';
import Categories from '../categories/categories.component';

import './settings.styles.scss';

const mapStateToProps = createStructuredSelector({
	userSettings: selectUserSettings
})

const mapDispatchToProps = dispatch => ({
	setUserSettings: settings => dispatch(setUserSettings(settings)),
	startLoading: message => dispatch(startLoading(message)),
	stopLoading: () => dispatch(stopLoading()),
	setAlert: alert => dispatch(setAlert(alert))
})

const Settings = ({ setUserSettings, userSettings, setAlert, startLoading, stopLoading }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [settings, setSettings] = useState({
		target: userSettings.target,
		cycle: userSettings.cycle,
		currency: userSettings.currency,
		categories: userSettings.categories
	});

	useEffect(()=>{
		setSettings(userSettings);
	}, [setSettings, userSettings])

	let { target, cycle, currency, categories } = settings;

	const updateProfile = async settings => {
		startLoading('updating settings')
		axiosConfig('post', '/update-settings', {
			...settings,
			target: Number(target).toFixed(0),
			categories: categories.join(',')
		}).then(({ data })=>{
			const { cycle, currency, target, categories } = data;
			setUserSettings({ 
				cycle,
				currency,
				target,
				categories: categories.split(',') 
			})
			stopLoading();
			setAlert('settings updated!')
			setIsEditing(false);
		}).catch(err => {
			stopLoading();
			setAlert('unable to update settings')
			setIsEditing(false);
		})
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