import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { numberWithCommas } from '../../utils';

import { selectTotalTargetExpenses, selectCurrencySymbol } from '../../redux/expenses/expenses.selectors';
import { selectUserSettings } from '../../redux/user/user.selectors';

import NumberEncounting from '../number-encounting/number-encounting.component';

import './meter.styles.scss';

const mapStateToProps = createStructuredSelector({
	totalTargetExpense: selectTotalTargetExpenses,
	userSettings: selectUserSettings,
	currency: selectCurrencySymbol
})

const Meter = ({ totalTargetExpense, userSettings, currency }) => {
	const { target, cycle } = userSettings;
	if (!target || !cycle) return <span>user settings not found</span>

	let percent = totalTargetExpense
		? 	totalTargetExpense * 100 / target
		: 	0
	percent = percent > 100 ? 100 : percent;
	percent = Math.ceil(percent);
	
	const screenWidth = window.innerWidth;
	const diameter = screenWidth > 890 ? 320 : 220;
	const strokeWidth = 22;
	const radius = diameter / 2 - strokeWidth;
	const circumference = radius * 2 * Math.PI;
	const offset = circumference - percent / 100 * circumference;

	return (
		<div className='meter'>
			<div className='display-panel'>
				<div className='ring-group'>
					<svg
						className='meter-ring back'
						height={diameter}
						width={diameter}
					>
						<circle
							className='circle'
							stroke='rgba(129, 158, 252, 0.2)'
							strokeWidth={strokeWidth}
							fill='transparent'
							r={radius}
							cx={diameter / 2}
							cy={diameter / 2}
						/>
					</svg>
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
					<NumberEncounting 
						className='percent'
						duration={2500} 
						starting={0}
						ending={percent}
						after='%'
					/>
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
		</div>
	)
}

export default connect(mapStateToProps)(Meter);