import React, { Component, lazy, Suspense } from 'react';

import ExpenseInput from '../../components/expense-input/expense-input.component';
import Meter from '../../components/meter/meter.component';

import './home.styles.scss';

const Home = () => {

	return (
		<div className='home'>
			<Meter />
			<ExpenseInput />
		</div>
	)
}

export default Home;