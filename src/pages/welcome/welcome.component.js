import React, { lazy } from 'react';
import { Route, withRouter } from 'react-router-dom';

import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './welcome.styles.scss';

const SignUpForm = lazy(() => import('../../components/sign-up-form/sign-up-form.component'))
const Register = lazy(() => import('../../components/register/register.component'))

const Welcome = ({ match, history }) => (
	<div>
		<Route
			exact
			path={match.path}
			render={()=>(
				<div className='welcome hover'>
					<div className='info'>
						<h2>New to SpentAll?</h2>
						<p>SpentAll is a simple to use, spending tracker. Log your expenditures, categorize them, and track your spending habits with the analytics page. You can even set monthly, weekly, or daily spending limits to help you stay conscious of your spending! This app is perfect for those simply looking to keep an eye on their expenditures.</p>
						<CustomButton 
							selected 
							onClick={()=>history.push(`${match.path}/sign-up`)}
						> 
							sign up
						</CustomButton>
					</div>
					<SignInForm />
				</div>
			)}
		/>
		<Route
			path={`${match.path}/sign-up`}
			component={SignUpForm}
		/>
		<Route
			path={`${match.path}/register`}
			component={Register}
		/>
	</div>
)

export default withRouter(Welcome);