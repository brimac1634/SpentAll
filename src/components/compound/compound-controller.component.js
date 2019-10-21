import React, { useState } from 'react';

const Controller = ({ children }) => {
	const [show, setShow] = useState(false);
	const [triggerRect, setPositition] = useState({
		x: '',
		y: '',
		width: '',
		height: ''
	})

	const toggle = () => setShow(!show);

	const childrenWithProps = React.Children.map(children, (child, i) => {
	    if (i === 0) {
	      	return React.cloneElement(child, { toggle, setPositition })
	    } else {
      		return (
	            <span className='compound-span' onClick={event => event.stopPropagation()}>
		            {
		            	React.cloneElement(child, { toggle, show, triggerRect })
		            }
		        </span>
		    )
	    }
    });

    return (
    	<div>
	    	{childrenWithProps}
    	</div>
    );
}
export default Controller;