import React, { useEffect } from 'react';

import { validatePassword } from '../../utils';

import FormInput from '../form-input/form-input.component';

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
	)
}

export default NewPassword;