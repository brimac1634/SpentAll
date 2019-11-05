import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { selectCurrentUser } from '../../redux/user/user.selectors';

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
		<Link to={'/'}>
			<h3 className='title'>SpentAll</h3>
		</Link>
		<div className={`icon-set ${currentUser ? 'show' : 'hide'}`}>
			<Link to='/account' className='icon'>
				<HomeIcon />
			</Link>
			<Link to='/account/analytics' className='icon'>
				<AnalyticsIcon />
			</Link>
			<Link to='/account/expenditures' className='icon'>
				<ListIcon />
			</Link>
			<Link to='/account/settings' className='icon'>
				<SettingsIcon />
			</Link>
		</div>
	</div>
)

export default connect(mapStateToProps)(Header);