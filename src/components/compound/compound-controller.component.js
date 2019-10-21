import React, { useState, useEffect } from 'react';

const Controller = ({ children }) => {
	const [show, setShow] = useState(false);
	const [triggerRect, setTriggerRect] = useState({
		x: '',
		y: '',
		width: '',
		height: ''
	})

	useEffect(()=>{
		setTimeout(() => {
			if(show){
				// window.addEventListener('click', this.animateOut)
				// window.addEventListener('keydown', this.handleEntryKey)
			} else {
				// window.removeEventListener('click', this.animateOut)
				// window.removeEventListener('keydown', this.handleEntryKey)
			}
		}, 0)
	}, [show])

	// const handleEntryKey = (event) => {
	// 	if (event.which === 13) {
	// 		this.animateOut()
	// 	}
	// }

	const setPositition = (rect) => {
		setTriggerRect({
			x: rect.x,
			y: rect.y,
			width: rect.width,
			height: rect.height
		})
	}

	const toggle = () => setShow(!show)

	const childrenWithProps = React.Children.map(children, (child, i) => {
	    if (i === 0) {
	      	return React.cloneElement(child, { toggle: toggle, setPositition: setPositition })
	    } else {
      		return (
	            <span className='compound-span' onClick={event => event.stopPropagation()}>
		            {React.cloneElement(child, { toggle: toggle, show: show, triggerRect: triggerRect })}
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