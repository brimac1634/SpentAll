import React, { useRef, useEffect } from 'react';

const Trigger = ({ toggle, setPositition, children }) => {
	const selectedElement = useRef(null);

	useEffect(()=>{
		const rect = selectedElement.current.getBoundingClientRect()
		setPositition(rect);
	}, [selectedElement])

	const childrenWithProps = React.Children.map(children, child => {
      	 return React.cloneElement(child, { onClick: toggle, ref: selectedElement })      
    });

	return (
		<div name='trigger'>
			{childrenWithProps}
		</div>
	);
}
export default Trigger;