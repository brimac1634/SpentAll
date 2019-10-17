import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, href, large, tiny, color, inverted, padding, ...otherProps }) => {
	const renderButton = () => (
		<button 
			className={`custom-button ${inverted ? 'inverted' : ''} ${tiny ? 'mobile' : null} ${large ? 'large' : null}`} 
			style={{
				backgroundColor: color || null, 
				padding: padding || null
			}}
			{...otherProps} 
		>
			{children}
		</button>
	)

	return (
		<div>
			{
				href
				? 	<a 
						className='link'
						href={href} 
						target='_blank' 
						rel='noopener noreferrer'
					>
						{renderButton()}
					</a>
				: 	renderButton()
			}
		</div>
	)
	
}

export default CustomButton;