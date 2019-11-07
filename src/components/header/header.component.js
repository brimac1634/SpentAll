import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as SettingsIcon } from '../../assets/settings.svg'
import { ReactComponent as AnalyticsIcon } from '../../assets/analytics.svg'
import { ReactComponent as ListIcon } from '../../assets/list.svg'
import { ReactComponent as HomeIcon } from '../../assets/home.svg'
import { ReactComponent as MenuIcon } from '../../assets/menu.svg'

import './header.styles.scss';

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
})

const Header = ({ currentUser }) => {
	const [menuIsOpen, setMenuIsOpen] = useState(false);

	return (
		<div className='header'>
			<div className='logo-container'>
				<Link to={'/'}>
					<Logo className='logo'/>
				</Link>
			</div>
			<div className={`icon-set ${currentUser ? 'show' : 'hide'}`}>
				<Link to='/user/account' className='icon'>
					<HomeIcon />
				</Link>
				<Link to='/user/account/analytics' className='icon'>
					<AnalyticsIcon />
				</Link>
				<Link to='/user/account/expenditures' className='icon'>
					<ListIcon />
				</Link>
				<Link to='/user/account/settings' className='icon'>
					<SettingsIcon />
				</Link>
			</div>
			<MediaQuery maxWidth={780}>
				<div 
					className='icon menu' 
					onClick={()=>setMenuIsOpen(!menuIsOpen)} 
				>
					<MenuIcon />
				</div>
			</MediaQuery>
		</div>
	)
}

export default connect(mapStateToProps)(Header);