import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrencies } from '../../redux/expenses/expenses.selectors';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import LabelGroup from '../label-group/label-group.component';
import HoverBox from '../hover-box/hover-box.component';
import FilterSelector from '../filter-selector/filter-selector.component';

import './preferences.styles.scss';

const mapStateToProps = createStructuredSelector({
	currencies: selectCurrencies
})

const Preferences = ({ settings, handleChange, setSettings, currencies }) => {
	const [showCurrencies, setShowCurrencies] = useState(false);
	let { target, cycle, currency } = settings;
	const targetTimes = ['monthly', 'weekly', 'daily'];

	return (
		<div className='preferences'>
			<LabelGroup
				label='currency'
				tooltip='This will be your default currency. (USD/EUR/HKD/etc.)'
			>
				<CustomButton
					onClick={()=>setShowCurrencies(true)}
				> 
					 {currency || 'select'}
				</CustomButton>
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
					placeholder='example: 2000'
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
			{
				ReactDOM.createPortal(
					<HoverBox 
						show={showCurrencies} 
						backgroundClick={e=>{
							e.stopPropagation();
							setShowCurrencies(false);
						}}
					>
						<h3 className='filter-title'>Currency Selector</h3>
						<FilterSelector 
							options={currencies} 
							select={currency=>{
								setSettings({ 
									...settings, currency
								})
								setShowCurrencies(false)
							}} 
						/>
					</HoverBox>
					, document.body
				)
			}
		</div>
	)
}

export default connect(mapStateToProps)(Preferences);