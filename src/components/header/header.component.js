import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as SettingsIcon } from '../../assets/settings.svg'
import { ReactComponent as AnalyticsIcon } from '../../assets/analytics.svg'
import { ReactComponent as ListIcon } from '../../assets/list.svg'
import { ReactComponent as HomeIcon } from '../../assets/home.svg'

import './header.styles.scss';

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
})

const Header = ({ currentUser }) => (
	<div className='header'>
		<div className='logo-container'>
			<Link to={'/'}>
				<Logo className='logo'/>
			</Link>
		</div>
		<div className={`icon-set ${currentUser ? 'show' : 'hide'}`}>
			<Link to='/user' className='icon'>
				<HomeIcon />
			</Link>
			<Link to='/user/analytics' className='icon'>
				<AnalyticsIcon />
			</Link>
			<Link to='/user/expenditures' className='icon'>
				<ListIcon />
			</Link>
			<Link to='/user/settings' className='icon'>
				<SettingsIcon />
			</Link>
		</div>
	</div>
)

export default connect(mapStateToProps)(Header);