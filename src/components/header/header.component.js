import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { ReactComponent as SettingsIcon } from '../../assets/settings.svg'
import { ReactComponent as AnalyticsIcon } from '../../assets/analytics.svg'
import { ReactComponent as HomeIcon } from '../../assets/home.svg'

import './header.styles.scss';

const Header = ({ history }) => {

    return (
		<div className='header'>
			<h3 className='title'>SpentAll</h3>
			<div className='icon-set'>
				<Link to={'/'} className='icon'>
					<HomeIcon />
				</Link>
				<Link to={'/analytics'} className='icon'>
					<AnalyticsIcon />
				</Link>
				<Link to={'/settings'} className='icon'>
					<SettingsIcon />
				</Link>
			</div>
		</div>
	)
}

export default withRouter(Header);