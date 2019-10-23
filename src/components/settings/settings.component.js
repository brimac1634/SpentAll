import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './settings.styles.scss';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const Settings = ({ currentUser }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [settings, setSettings] = useState({
		target: '',
		targetTime: 'monthly',
		category: '',
		categories: []
	});

	const targetTimes = ['monthly', 'weekly', 'daily'];
	let { target, targetTime, category, categories } = settings;

	const updateProfile = async settings => {
		axios.post('/update-settings', settings)
			.then(({ data })=>{
				console.log(data)
			}).catch(err => {
				console.log(err)
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
						<span>20,000</span>
					</div>
					<div className='sub-group'>
						<span className='label'>spending cycle: </span>
						<span>monthly</span>
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
										selected={time === targetTime}
										onClick={()=>setSettings({ 
											...settings, targetTime: time
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
export default connect(mapStateToProps)(Settings);