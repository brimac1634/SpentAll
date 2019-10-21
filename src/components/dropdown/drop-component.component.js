import React, { useState, useRef, useEffect } from 'react';

import './dropdown.styles.scss';

const DropComponent = ({toggle, show, triggerRect, children }) => {
	const [contentSize, setContentSize] = useState({
		contentWidth: '',
		contentHeight: '',
	});
	const content = useRef(null);
	const { x, y, width, height } = triggerRect;
	const { contentWidth, contentHeight } = contentSize;

	useEffect(()=>{
		if (content.current.firstChild) {
			const rect = content.current.getBoundingClientRect();
			setContentSize({
				contentWidth: rect.width,
				contentHeight: rect.height,
			})
		}
	}, [content, setContentSize])

	const childrenWithProps = React.Children.map(children, child => {
      	 return React.cloneElement(child, { toggleDropdown: toggle })      
    });

	return (
		<div 
			className={`drop-down ${show ? 'fade-in' : 'fade-out'}`} 
			style={{width: `${contentWidth}px`, height: `${contentHeight}px`, top: `${y + height}px`, left: `${x - contentWidth + width}px`}}
			onClick={toggle}
		>
			<div ref={content}>
				{childrenWithProps}
			</div>
		</div>
	);
}

export default DropComponent;