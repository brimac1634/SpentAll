import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './profile.styles.scss';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(signOutStart())
})

const Profile = ({ currentUser, logout }) => {
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
			<div className='box profile-box'>
				<h3>Welcome, {userName}</h3>
				<CustomButton
					selected
					onClick={logout}
				> 
					logout
				</CustomButton>
			</div>
			<div className='box'>
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
						<div className='sub-group'>
							<span className='label'>spending limit target</span>
							<FormInput 
								name='target' 
								type='number' 
								min='0'
								value={target} 
								label='target $'
								placeholder='2,000'
								handleChange={handleChange}
							/>
						</div>
						<div className='sub-group'>
							<span className='label'>spending target time frame</span>
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
						</div>
						<div className='sub-group'>
							<span className='label'>add or remove spending categories</span>
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
					</div>
				}
			</div>
		</div>
	)
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);