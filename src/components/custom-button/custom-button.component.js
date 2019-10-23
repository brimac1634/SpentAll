import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, selected, ...otherProps }) => (
	<button 
		className={`custom-button ${selected ? 'selected' : 'unselected'}`}
		{...otherProps} 
	>
		{children}
	</button>
)

export default CustomButton;