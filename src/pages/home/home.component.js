import React from 'react';

import ExpenseInput from '../../components/expense-input/expense-input.component';
import MeterContainer from '../../components/meter/meter.container';

import './home.styles.scss';

const Home = () => {

	return (
		<div className='home'>
			<MeterContainer />
			<ExpenseInput />
		</div>
	)
}

export default Home;