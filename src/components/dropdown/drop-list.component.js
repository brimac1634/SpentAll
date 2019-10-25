import React from 'react';

import './dropdown.styles.scss';

const DropList = ({ list, show, toggle, maxHeight, handleSelection, adjustY, triggerRect: {x, y, width, height}}) => {

	const handleSelect = item => {
		handleSelection(item)
		toggle()
	}
	
	return (
		<div>
			<div
	            className='back-overlay'
	            onClick={toggle}
	        >
				<div 
					className={`drop-down ${show ? 'fade-in' : 'fade-out'}`} 
					style={{width: `${width}px`, height: `auto`, maxHeight: `${maxHeight}`, top: `${y + height + (adjustY || 0)}px`, left: `${x}px`}}
				>
					<div className='scroll-list'>
						{	
							list &&
							list.map((item, i) => (
								<div  
									className='item'
									key={i}
									onClick={()=>handleSelect(item)}
								>
									<span>{item}</span>
								</div>
							))
						}
					</div>
				</div>
			</div>
		</div>
		
	);
	
}

export default DropList;