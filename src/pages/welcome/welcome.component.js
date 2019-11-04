import React, { lazy } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import { selectIsUserFetching } from '../../redux/user/user.selectors';

import Loader from '../../components/loader/loader.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './welcome.styles.scss';

const SignUpForm = lazy(() => import('../../components/sign-up-form/sign-up-form.component'))
const NewPasswordForm = lazy(() => import('../../components/new-password-form/new-password-form.component'))
const Register = lazy(() => import('../../components/register/register.component'))

const mapStateToProps = createStructuredSelector({
	isLoadingUser: selectIsUserFetching
})

const Welcome = ({ match, history, isLoadingUser }) => (
	<div>
		<Switch>
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
								Sign Up
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
			<Route
				path={`${match.path}/reset-account`}
				render={()=>(
					<SignUpForm isReset />
				)}
			/>
			<Route
				path={`${match.path}/new-password`}
				component={NewPasswordForm}
			/>
			<Redirect to='/welcome' />
		</Switch>
		{
			isLoadingUser &&
			<Loader />
		}
	</div>
)

export default withRouter(connect(mapStateToProps)(Welcome));