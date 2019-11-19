import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';

import { selectUserSettings } from '../../redux/user/user.selectors';

import MenuButton from '../menu-button/menu-button.component';

import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as SettingsIcon } from '../../assets/settings.svg'
import { ReactComponent as AnalyticsIcon } from '../../assets/analytics.svg'
import { ReactComponent as ListIcon } from '../../assets/list.svg'
import { ReactComponent as HomeIcon } from '../../assets/home.svg'

import './header.styles.scss';

const mapStateToProps = createStructuredSelector({
	userSettings: selectUserSettings
})

const Header = ({ userSettings }) => {
	const [menuIsOpen, setMenuIsOpen] = useState(false);
	
	const closeMenu = useCallback(()=>{
		setMenuIsOpen(false);
	}, [setMenuIsOpen])

	useEffect(()=>{
		if (menuIsOpen) {
			window.addEventListener('click', closeMenu)
		} else {
			window.removeEventListener('click', closeMenu)
		}
		return () => {
			window.removeEventListener('click', closeMenu)
		}
	}, [menuIsOpen, closeMenu])

	const accountComplete = userSettings ? !!userSettings.cycle : false;
	return (
		<div className='header'>
			<div className='logo-container'>
				<Link to={'/'}>
					<Logo className='logo'/>
				</Link>
			</div>
			<div 
				className={`icon-set ${accountComplete ? 'show' : 'hide'} ${menuIsOpen ? 'drop-in' : 'drop-out'}`}
				onClick={()=>setMenuIsOpen(!menuIsOpen)}
			>
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
				<MediaQuery maxWidth={780}>
					<div 
						className='icon' 
						onClick={()=>setMenuIsOpen(!menuIsOpen)} 
					>
						<MenuButton showMenu={menuIsOpen} />
					</div>
				</MediaQuery>
			</div>
		</div>
	)
}

export default connect(mapStateToProps)(Header);