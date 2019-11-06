import React, { lazy } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Account from '../account/account.component';

import { selectUserSettings } from '../../redux/user/user.selectors';

const NewSettings = lazy(() => import('../../components/new-settings/new-settings.component'))

const mapStateToProps = createStructuredSelector({
  userSettings: selectUserSettings
})

const User = ({ match, userSettings }) => {
	const { cycle } = userSettings;
	return (
		<Switch>
			<Route path={`${match.path}/account`} render={()=>
				cycle ? (
					<Account />
				) : (
					<Redirect to={`${match.path}/create-settings`} />
				)
			}/>
			<Route 
				path={`${match.path}/create-settings`}
				render={()=>
					!cycle ? (
						<NewSettings />
					) : (
						<Redirect to={match.path} />
					)
				}
			/>
			<Redirect to={`${match.path}/account`} />
		</Switch>
	)
}
export default withRouter(connect(mapStateToProps, null)(User));