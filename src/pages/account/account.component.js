import React, { lazy } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Home from '../home/home.component';

const Analytics = lazy(() => import('../analytics/analytics.component'))
const ProfileSettings = lazy(() => import('../profile-settings/profile-settings.component'))
const NewPasswordForm = lazy(() => import('../../components/new-password-form/new-password-form.component'))

const Account = ({ match }) => (
	<Switch>
		<Route exact path={match.path} component={Home}/>
		<Route path={`${match.path}/analytics`} component={Analytics}/>
		<Route path={`${match.path}/settings`} component={ProfileSettings}/>
		<Route
			path={`${match.path}/new-password`}
			render={()=>(
				<NewPasswordForm loggedIn />
			)}
		/>
		<Redirect to={match.path} />
	</Switch>
)
export default withRouter(Account);