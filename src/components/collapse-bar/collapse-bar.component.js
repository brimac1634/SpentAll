import React, { useState } from 'react';
import Collapsible from 'react-collapsible';

import './collapse-bar.styles.scss';

const CollapseBar = ({ children, label, open, ...otherProps }) => {
	const [isOpen, setIsOpen] = useState(open || false);
	return (
		<div className='collapse-bar'>
			<Collapsible 
				onOpening={()=>setIsOpen(true)}
				onClosing={()=>setIsOpen(false)}
				trigger={
					<div 
						className='bar' 
						{ ...otherProps }
					>
						<span className='label'>{label}</span>
						<div className='arrow-container'>
							<div className={`arrow ${isOpen ? 'down' : null}`} />
						</div>
					</div>
				}
			>
				{children}
			</Collapsible>
		</div>
	)
}
export default CollapseBar;