import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, show, selected, ...otherProps }) => (
	<button 
		className={`custom-button ${selected ? 'selected' : 'unselected'} ${show ? 'show' : 'hide'}`}
		{...otherProps} 
	>
		{children}
	</button>
)

export default CustomButton;