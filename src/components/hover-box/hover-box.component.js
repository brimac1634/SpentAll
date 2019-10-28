import React from 'react';

import './hover-box.styles.scss'

const HoverBox = ({ show, children, ...otherProps }) => (
	<div className={`hover-box ${show ? 'show' : 'hide'}`} {...otherProps}>
		<div className={`box ${show ? null : 'hide'}`}>
			{children}
		</div>
	</div>
)

export default HoverBox;