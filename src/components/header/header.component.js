import React from 'react';
import { withRouter } from 'react-router-dom';

import Trigger from '../compound/compound-trigger.component';
import Controller from '../compound/compound-controller.component';
import DropComponent from '../dropdown/drop-component.component';
import Menu from '../menu/menu.component';

import { ReactComponent as UserIcon } from '../../assets/user.svg'
import { ReactComponent as MenuIcon } from '../../assets/menu.svg'

import './header.styles.scss';

const Header = ({ history }) => {

    return (
		<div className='header'>
			<h3>SpentAll</h3>
			<div className='icon-set'>
				<Controller>
					<Trigger>
						<div className='icon'>
							<MenuIcon />
						</div>
					</Trigger>
					<DropComponent>
						<Menu />
					</DropComponent>
				</Controller>
				<div className='icon' onClick={()=>history.push('/settings')}>
					<UserIcon />
				</div>
			</div>
		</div>
	)
}

export default withRouter(Header);