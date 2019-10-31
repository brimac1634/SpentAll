import React from 'react';
import ReactTooltip from 'react-tooltip'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { ReactComponent as QuestionIcon } from '../../assets/question.svg'

import './preferences.styles.scss';

const Preferences = ({ settings, handleChange, setSettings }) => {
	let { target, cycle, currency } = settings;
	const targetTimes = ['monthly', 'weekly', 'daily'];

	return (
		<div className='preferences'>
			<div className='sub-group'>
				<div className='info-group'>
					<span className='label'>currency</span>
					<div data-tip='This will be your default currency. (USD$/EUR€/HKD$/etc.)'>
						<QuestionIcon />
					</div>
					<ReactTooltip effect='solid'/>
				</div>
				<FormInput 
					name='currency' 
					type='text' 
					value={currency} 
					margin='0'
					label='currency'
					placeholder='USD$'
					handleChange={handleChange}
				/>
			</div>
			<div className='sub-group'>
				<div className='info-group'>
					<span className='label'>spending limit</span>
					<div data-tip='This is the maximum amount you wish to spend per cycle. (Please omit commas)'>
						<QuestionIcon />
					</div>
					<ReactTooltip effect='solid'/>
				</div>
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
			</div>
			<div className='sub-group'>
				<div className='info-group'>
					<span className='label'>spending cycle</span>
					<div data-tip='This will be your default spending cycle in relation to your spending limit. (Default is monthly)'>
						<QuestionIcon />
					</div>
					<ReactTooltip effect='solid'/>
				</div>
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