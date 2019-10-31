import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas } from '../../utils';

import { selectTotalTargetExpenses } from '../../redux/expenses/expenses.selectors';
import { selectUserSettings, selectCurrency } from '../../redux/user/user.selectors';
import { toggleAddExpense } from '../../redux/expenses/expenses.actions';

import CustomButton from '../custom-button/custom-button.component';

import './meter.styles.scss';

const mapStateToProps = createStructuredSelector({
	totalTargetExpense: selectTotalTargetExpenses,
	userSettings: selectUserSettings,
	currency: selectCurrency
})

const mapDispatchToProps = dispatch => ({
	toggleAddExpense: () => dispatch(toggleAddExpense())
})

const Meter = ({ totalTargetExpense, userSettings, toggleAddExpense, currency }) => {
	const { target, cycle } = userSettings;
	if (!target || !cycle) return <span>user settings not found</span>

	let percent = totalTargetExpense
		? 	totalTargetExpense * 100 / target
		: 	0
	percent = percent > 100 ? 100 : percent;
	percent = Math.ceil(percent);

	const diameter = 320;
	const strokeWidth = 22;
	const radius = diameter / 2 - strokeWidth * 2;
	const circumference = radius * 2 * Math.PI;
	const offset = circumference - percent / 100 * circumference;

	return (
		<div className='meter'>
			<div className='display-panel'>
				<div className='ring-group'>
					<svg
						className='meter-ring'
						height={diameter}
						width={diameter}
					>
						<circle
							className='circle'
							stroke='#c4f0ff'
							strokeWidth={strokeWidth}
							fill='transparent'
							r={radius}
							cx={diameter / 2}
							cy={diameter / 2}
							style={{
								strokeDasharray: `${circumference} ${circumference}`, 
								strokeDashoffset: offset
							}}
						/>
					</svg>
					<h1 className='percent'>{percent}%</h1>
				</div>
				<div className='message-group'>
					<div className='row'>
						<h1>{percent}%</h1>
						<h3>of your {cycle} limit</h3>
					</div>
					<h3>or</h3>
					<div className='row'>
						<h1>{currency}{numberWithCommas(totalTargetExpense)}</h1>
						<h3>out of</h3>
						<h1>{currency}{numberWithCommas(target)}</h1>
					</div>
				</div>
			</div>
			<div className='button-container'>
				<CustomButton 
					selected
					onClick={toggleAddExpense}
				> 
					add expenditure 
				</CustomButton>
			</div>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Meter);