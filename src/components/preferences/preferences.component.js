import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './preferences.styles.scss';

const Preferences = ({ settings, handleChange, setSettings }) => {
	let { target, cycle, currency } = settings;
	const targetTimes = ['monthly', 'weekly', 'daily'];

	return (
		<div className='preferences'>
			<div className='sub-group'>
				<span className='label'>currency</span>
				<FormInput 
					name='currency' 
					type='text' 
					value={currency} 
					margin='0'
					label='currency'
					placeholder='$USD'
					handleChange={handleChange}
				/>
			</div>
			<div className='sub-group'>
				<span className='label'>spending limit</span>
				<FormInput 
					name='target' 
					type='number' 
					min='0'
					value={target} 
					margin='0'
					label={`target ${currency}`}
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
		</div>
	)
}

export default Preferences;