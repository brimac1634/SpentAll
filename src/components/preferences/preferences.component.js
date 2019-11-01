import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import LabelGroup from '../label-group/label-group.component';

import './preferences.styles.scss';

const Preferences = ({ settings, handleChange, setSettings }) => {
	let { target, cycle, currency } = settings;
	const targetTimes = ['monthly', 'weekly', 'daily'];

	return (
		<div className='preferences'>
			<LabelGroup
				label='currency'
				tooltip='This will be your default currency. (USD$/EUR€/HKD$/etc.)'
			>
				<FormInput 
					name='currency' 
					type='text' 
					value={currency} 
					margin='0'
					label='currency'
					placeholder='USD$'
					handleChange={handleChange}
				/>
			</LabelGroup>
			<LabelGroup
				label='spending limit'
				tooltip='This is the maximum amount you wish to spend per cycle. (Please omit commas)'
			>
				<FormInput 
					name='target' 
					type='number' 
					min='0'
					value={target} 
					margin='0'
					label={`target ${currency}`}
					placeholder='2000'
					handleChange={handleChange}
				/>
			</LabelGroup>
			<LabelGroup
				label='spending cycle'
				tooltip='This will be your default spending cycle in relation to your spending limit. (Default is monthly)'
			>
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
			</LabelGroup>
		</div>
	)
}

export default Preferences;