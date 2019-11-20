import React, { lazy, useState } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import WelcomeInfo from '../../components/welcome-info/welcome-info.component';
import ParallaxSpring from '../../components/parallax-spring/parallax-spring.component';
import SectionBox from '../../components/section-box/section-box.component';

import './welcome.styles.scss';

const SignInForm = lazy(() => import('../../components/sign-in-form/sign-in-form.component'))
const SignUpForm = lazy(() => import('../../components/sign-up-form/sign-up-form.component'))
const NewPasswordForm = lazy(() => import('../../components/new-password-form/new-password-form.component'))
const ContactForm = lazy(() => import('../../components/contact-form/contact-form.component'))

const Welcome = ({ match }) => {
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
					component={WelcomeInfo}
				/>
				<Route
					path={`${match.path}/sign-in`}
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
				<Route
					path={`${match.path}/contact-us`}
					render={()=>(
						<div className='contact'>
							<SectionBox>
								<ContactForm/>
							</SectionBox>
						</div>
					)}
				/>
				<Redirect to='/welcome' />
			</Switch>
		</div>
	)
}

export default withRouter(Welcome);