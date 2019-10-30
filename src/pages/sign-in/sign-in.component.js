import React from 'react';
import { withRouter } from 'react-router-dom';

import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './sign-in.styles.scss';

const SignIn = ({ history }) => (
	<div className='sign-in hover'>
		<div className='info'>
			<h2>New to SpentAll?</h2>
			<p>SpentAll is a simple to use, spending tracker. Log your expenditures, categorize them, and track your spending habits with the analytics page. You can even set monthly, weekly, or daily spending limits to help you stay conscious of your spending! This app is perfect for those simply looking to keep an eye on their expenditures.</p>
			<CustomButton selected onClick={()=>history.push('/register')}> 
				register
			</CustomButton>
		</div>
		<SignInForm />
	</div>
)

export default withRouter(SignIn);