import React, { lazy } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Home from '../home/home.component';

const Analytics = lazy(() => import('../analytics/analytics.component'))
const Expenses = lazy(() => import('../expenses/expenses.component'))
const ProfileSettings = lazy(() => import('../profile-settings/profile-settings.component'))

const Account = ({ match }) => (
	<Switch>
		<Route exact path={match.path} component={Home}/>
		<Route path={`${match.path}/analytics`} component={Analytics}/>
		<Route path={`${match.path}/expenditures`} component={Expenses}/>
		<Route path={`${match.path}/settings`} component={ProfileSettings}/>
		<Redirect to={match.path} />
	</Switch>
)
export default withRouter(Account);