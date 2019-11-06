import React, { lazy, useState } from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import { selectIsUserFetching } from '../../redux/user/user.selectors';

import Loader from '../../components/loader/loader.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import ParallaxSpring from '../../components/parallax-spring/parallax-spring.component';

import './welcome.styles.scss';

const SignUpForm = lazy(() => import('../../components/sign-up-form/sign-up-form.component'))
const NewPasswordForm = lazy(() => import('../../components/new-password-form/new-password-form.component'))

const mapStateToProps = createStructuredSelector({
	isLoadingUser: selectIsUserFetching
})

const Welcome = ({ match, isLoadingUser }) => {
	const [props, set] = useState({ x: 0, y: 0 });
	const { x, y } = props;
	return (
		<div 
			className='welcome' 
			onMouseMove={({ clientX: x, clientY: y }) => set({ x, y })}
		>
			<ParallaxSpring x={x} y={y} />
			<Switch>
				<Route
					exact
					path={match.path}
					component={SignInForm}
				/>
				<Route
					path={`${match.path}/sign-up`}
					component={SignUpForm}
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
}

export default withRouter(connect(mapStateToProps)(Welcome));