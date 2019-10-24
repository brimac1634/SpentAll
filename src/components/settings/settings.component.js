import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import { numberWithCommas } from '../../utils';

import { selectUserSettings } from '../../redux/user/user.selectors';
import { setAlert } from '../../redux/alert/alert.actions'; 
import { setUserSettings } from '../../redux/user/user.actions'; 
import { startLoading, stopLoading } from '../../redux/loading/loading.actions'; 

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

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
		category: '',
		categories: userSettings.categories
	});

	const targetTimes = ['monthly', 'weekly', 'daily'];
	let { target, cycle, category, categories } = settings;

	const updateProfile = async settings => {
		startLoading('updating settings')
		axios.post('/update-settings', {
			...settings,
			categories: categories.join(',')
		}).then(({ data })=>{
			const { cycle, target, categories } = data;
			setUserSettings({ 
				cycle, 
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

	const handleNewCategory = event => {
		if (event.which === 13) {
			event.preventDefault();
			const { value } = event.target;
			categories = categories ? [...categories, value] : [value]
			setSettings({ ...settings, categories, category: '' });
		}
	}

	const removeFromArray = (array, index) => {
		array.splice(index, 1);
		setSettings({ ...settings, array });
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
						<span className='label'>spending limit: </span>
						<span>${numberWithCommas(target)}</span>
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
									<div key={i} className='cat'>
										<span>{category}</span>
									</div>
								))
							}
						</div>
					</div>
				</div>
			}
			{
				isEditing &&
				<div className='edit-group'>
					<div className='sub-group'>
						<span className='label'>spending limit</span>
						<FormInput 
							name='target' 
							type='number' 
							min='0'
							value={target} 
							margin='0'
							label='target $'
							placeholder='2,000'
							handleChange={handleChange}
						/>
					</div>
					<div className='sub-group'>
						<span className='label'>spending cycle</span>
						<div className='target-times'>
							{
								targetTimes.map(time=>(
									<CustomButton
										key={time}
										selected={time === cycle}
										onClick={()=>setSettings({ 
											...settings, cycle: time
										})}
									> 
										 {time}
									</CustomButton>
								))
							}
						</div>
					</div>
					<div className='sub-group'>
						<span className='label'>add or remove spending categories</span>
						<FormInput 
							name='category' 
							type='text'
							label='new category'
							value={category}
							margin='0'
							placeholder='entertainment'
							handleChange={handleChange}
							onKeyPress={handleNewCategory}
						/>
						<div className='categories'>
							{
								categories &&
								categories.map((category, i)=>(
									<div key={i} className='cat'>
										<span>{category}</span>
										<span
											className='delete'
											onClick={()=>removeFromArray(categories, i)}
										>
											&#10005;
										</span>
									</div>
								))
							}
						</div>
					</div>
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