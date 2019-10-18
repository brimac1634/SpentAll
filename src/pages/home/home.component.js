import React, { Component, lazy, Suspense } from 'react';

import ExpenseInput from '../../components/expense-input/expense-input.component';

const Home = () => {

	return (
		<div>
			<ExpenseInput />
		</div>
	)
}

export default Home;