import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, hide, selected, ...otherProps }) => (
	<button 
		className={`custom-button ${selected ? 'selected' : 'unselected'} ${hide ? 'hide' : null}`}
		{...otherProps} 
	>
		{children}
	</button>
)

export default CustomButton;