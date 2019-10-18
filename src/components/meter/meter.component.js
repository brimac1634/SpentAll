import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectTotalExpenses } from '../../redux/expenses/expenses.selectors';

import './meter.styles.scss';

const mapStateToProps = createStructuredSelector({
	totalExpenses: selectTotalExpenses
})

const Meter = ({ totalExpenses }) => {
	const target = 20000;

	let percent = totalExpenses
		? 	totalExpenses * 100 / target
		: 	0
	percent = percent > 100 ? 100 : percent;

	const diameter = 320;
	const strokeWidth = 22;
	const radius = diameter / 2 - strokeWidth * 2;
	const circumference = radius * 2 * Math.PI;
	const offset = circumference - percent / 100 * circumference;

	return (
		<div className='meter'>
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
			<span className='percent'>{percent}%</span>
		</div>
	)
}

export default connect(mapStateToProps)(Meter);