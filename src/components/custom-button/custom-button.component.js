import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, hide, selected, disabled, ...otherProps }) => (
	<button 
		className={`custom-button ${selected ? 'selected' : 'unselected'} ${hide ? 'hide' : null} ${disabled ? 'disabled' : null}`}
		{...otherProps} 
	>
		{children}
	</button>
)

export default CustomButton;