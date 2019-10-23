import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './profile.styles.scss';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const Profile = ({ currentUser }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [settings, setSettings] = useState({
		target: '',
		targetTime: '',
		categories: []
	});
	if (!currentUser) return <span>Not Currently Logged In</span>

	const targetTimes = ['monthly', 'weekly', 'daily'];
	const { userName } = currentUser;
	let { target, targetTime, categories } = settings;

	const handleChange = event => {
		let { value, name } = event.target;
		setSettings({ ...settings, [name]: value });
	}

	const handleNewCategory = event => {
		if (event.which === 13) {
			event.preventDefault();
			const { value } = event.target;
			categories = categories ? [...categories, value] : [value]
			setSettings({ ...settings, categories });
		}
	}

	const removeFromArray = (array, index) => {
		array.splice(index, 1);
		setSettings({ ...settings, array });
	}

	return (
		<div className='profile'>
			<h2>Welcome, {userName}</h2>
			<div className='settings-box'>
				<div className='top-bar'>
					<h3>Settings</h3>
					<CustomButton
						selected
						onClick={()=>setIsEditing(!isEditing)}
					> 
						{isEditing ? 'cancel' : 'edit'} 
					</CustomButton>
				</div>
				{
					isEditing &&
					<div className='edit-group'>
						<FormInput 
							name='target' 
							type='number' 
							min='0'
							value={target} 
							label='target $'
							placeholder='2,000'
							handleChange={handleChange}
						/>
						<div className='target-times'>
							{
								targetTimes.map(time=>(
									<CustomButton
										selected
										onClick={()=>setSettings({ 
											...settings, targetTime: time
										})}
									> 
										 {time}
									</CustomButton>
								))
							}
						</div>
						<FormInput 
							name='category' 
							type='text'
							label='new type'
							placeholder='entertainment'
							handleChange={handleNewCategory}
						/>
						<div className='categories'>
							{
								categories &&
								categories.map((category, i)=>(
									<div key={i}>
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
				}
			</div>
		</div>
	)
}
export default connect(mapStateToProps)(Profile);