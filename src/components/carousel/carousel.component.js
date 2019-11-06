import React, { useCallback, useState, useRef, useEffect } from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './carousel.styles.scss';

const Carousel = ({ children, showIndicator, submit, cancel, handleIndex, disableNext }) => {
	const [index, setIndex] = useState(0);
	const [translateValue, setTranslation] = useState(0);
	const galleryItem = useRef(null);

	useEffect(()=>{
		handleIndex(index);
	}, [handleIndex, index])

	const nextItem = useCallback(() => {
		const { width } = galleryItem.current.getBoundingClientRect()
	    if (index === children.length - 1) {
			setIndex(0)
			setTranslation(0)
		} else {
			setTranslation((index + 1) * -width)
			setIndex(index + 1)
		} 
	}, [index, children])

	const previousItem = () => {
		const { width } = galleryItem.current.getBoundingClientRect()
		if (index === 0) {
			setIndex(children.length - 1)
			setTranslation(-width * (children.length - 1))
		} else {
			setTranslation((index - 1) * -width)
			setIndex(index - 1)
		}
	}

	const isFinalItem = index === (children.length - 1)
	return (
		<div className='carousel' ref={galleryItem}> 
			<div 
				className="slider-wrapper"
	          	style={{
					transform: `translate(${translateValue}px, 0)`,
					WebkitTransform: `translate(${translateValue}px, 0)`
	            }}
	         >
	            {children}
	        </div>
	        <div className='bottom-bar'>
				<CustomButton onClick={index === 0 ? cancel : previousItem}> 
					{index === 0 ? 'cancel' : 'back'} 
				</CustomButton>
				{
					showIndicator &&
					<div className='indicators'>
						{
							children.map((image, i) => {
								const isCurrent = i === index;
								return (
									<div 
										key={i} 
										className={`indicator ${isCurrent ? 'current': null}`}
									/>
								)
							})
						}
					</div>
				}
				<CustomButton 
					selected 
					disabled={disableNext}
					onClick={isFinalItem ? submit : nextItem}
				> 
					{isFinalItem ? 'submit' : 'continue'}
				</CustomButton>
			</div>
		</div>
	)
}

export default Carousel;