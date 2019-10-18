import React from 'react';
import { withRouter } from 'react-router-dom';

import MenuButton from '../menu-button/menu-button.component';

import { ReactComponent as UserIcon } from '../../assets/user.svg'

import './header.styles.scss';

const Header = ({ history }) => {

    return (
		<div className='header'>
			header
			<div className='icon' onClick={()=>history.push('/login')}>
				<UserIcon />
			</div>
		</div>
	)
}

export default withRouter(Header);