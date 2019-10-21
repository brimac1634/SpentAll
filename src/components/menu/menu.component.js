import React from 'react';
import { Link } from 'react-router-dom';

import menuOptions from './menu.data';

import './menu.styles.scss';

const Menu = () => (
	<div className='menu'>
		{
			menuOptions.map(({ to, title})=>(
				<Link to={to} className='option' key={title}>
					{title}
				</Link>
			))
		}
	</div>
)

export default Menu;