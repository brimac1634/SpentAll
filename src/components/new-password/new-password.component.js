import React, { useEffect } from 'react';

import LabelGroup from '../label-group/label-group.component';

import { validatePassword } from '../../utils';

import FormInput from '../form-input/form-input.component';

import './new-password.styles.scss';

const NewPassword = ({ passwords, handleChange, passwordError, setPasswordError }) => {
	const { firstPassword, secondPassword } = passwords;
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

	return (
		<div className='new-password'>
			<h2>Password</h2>
			<form>
				<LabelGroup
					label='Create a new password'
					tooltip='The password must contain at least 8 characters'
				>
					<FormInput 
						name='firstPassword' 
						type='password' 
						value={firstPassword} 
						label='password'
						handleChange={handleChange}
						required 
					/>
				</LabelGroup>
				<LabelGroup
					label='Rewrite your new password'
				>
					<FormInput 
						name='secondPassword' 
						type='password' 
						value={secondPassword} 
						label='password'
						handleChange={handleChange}
						required 
					/>
				</LabelGroup>
				<span className={`error ${passwordError ? 'show' : 'hide'}`}>
					{passwordError}
				</span>
			</form>
		</div>
	)
}

export default NewPassword;