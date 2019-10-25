import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as SettingsIcon } from '../../assets/settings.svg'
import { ReactComponent as AnalyticsIcon } from '../../assets/analytics.svg'
import { ReactComponent as ListIcon } from '../../assets/list.svg'
import { ReactComponent as HomeIcon } from '../../assets/home.svg'

import './header.styles.scss';

const Header = () => (
	<div className='header'>
		<Link to={'/'}>
			<h3 className='title'>SpentAll</h3>
		</Link>
		<div className='icon-set'>
			<Link to={'/'} className='icon'>
				<HomeIcon />
			</Link>
			<Link to={'/analytics'} className='icon'>
				<AnalyticsIcon />
			</Link>
			<Link to={'/expenditures'} className='icon'>
				<ListIcon />
			</Link>
			<Link to={'/settings'} className='icon'>
				<SettingsIcon />
			</Link>
		</div>
	</div>
)

export default Header;