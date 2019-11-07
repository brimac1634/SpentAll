import React from 'react';

import './hover-box.styles.scss'

const HoverBox = ({ show, children, backgroundClick, ...otherProps }) => (
	<div 
		className={`hover-box ${show ? 'show' : 'hide'}`}
		onClick={backgroundClick} 
		{...otherProps}
	>
		<div 
			className={`box ${show ? null : 'hide'}`}
			onClick={e=>e.stopPropagation()}
		>
			{children}
		</div>
	</div>
)

export default HoverBox;