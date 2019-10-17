import React from 'react';

import './menu-button.styles.scss'

const MenuButton = ({ showMenu, ...otherProps }) => (
	<div 
		className={`menu ${showMenu ? 'close' : null}`}
		{ ...otherProps }
	>
		<div className='menu-button' >
			<div className='menu-lines'>
				<div></div>
			</div>
		</div>
	</div>
)

export default MenuButton;