import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MediaQuery from 'react-responsive';
import { Link, withRouter } from 'react-router-dom';

import { selectUserSettings } from '../../redux/user/user.selectors';

import MenuButton from '../menu-button/menu-button.component';
import HeaderButton from '../header-button/header-button.component';

import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as SettingsIcon } from '../../assets/settings.svg'
import { ReactComponent as AnalyticsIcon } from '../../assets/analytics.svg'
import { ReactComponent as ListIcon } from '../../assets/list.svg'
import { ReactComponent as HomeIcon } from '../../assets/home.svg'

import './header.styles.scss';

const mapStateToProps = createStructuredSelector({
	userSettings: selectUserSettings
})

const Header = ({ userSettings, location }) => {
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
			{
				location.pathname !== '/welcome' &&
				<div className='logo-container'>
					<Link to={'/'}>
						<Logo className='logo'/>
					</Link>
				</div>
			}
			<MediaQuery maxWidth={780}>
				<div className={`gradient-back ${menuIsOpen ? 'show' : null}`} />
			</MediaQuery>
			<div 
				className={`icon-set ${accountComplete ? 'show' : 'hide'} ${menuIsOpen ? 'drop-in' : 'drop-out'}`}
				onClick={()=>setMenuIsOpen(!menuIsOpen)}
			>
				<HeaderButton to='/user/account'>
					<HomeIcon />
				</HeaderButton>
				<HeaderButton to='/user/account/analytics'>
					<AnalyticsIcon />
				</HeaderButton>
				<HeaderButton to='/user/account/expenditures'>
					<ListIcon />
				</HeaderButton>
				<HeaderButton to='/user/account/settings'>
					<SettingsIcon />
				</HeaderButton>
				<MediaQuery maxWidth={780}>
					<div 
						className='header-button' 
						onClick={()=>setMenuIsOpen(!menuIsOpen)} 
					>
						<MenuButton showMenu={menuIsOpen} />
					</div>
				</MediaQuery>
			</div>
		</div>
	)
}

export default withRouter(connect(mapStateToProps)(Header));