import React, { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

import './parallax-spring.styles.scss';

const ParallaxSpring = ({ x, y }) => {
	const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 200, friction: 700 } }))

	useEffect(()=>{
		set({ xy: calc(x, y) });
	}, [set, x, y])

	const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
	const trans1 = (x, y) => `translate3d(${x / 5 - 500}px,${y / 8}px,0)`
	const trans2 = (x, y) => `translate3d(${x / 10 - 250}px,${y / 10}px,0)`
	const trans3 = (x, y) => `translate3d(${x / 10 + 250}px,${y / 10}px,0)`
	const trans4 = (x, y) => `translate3d(${x / 5 + 500}px,${y / 8}px,0)`

	return (
		<div 
			class="parallax-spring" 
		>
			<animated.div 
				class="card2" 
				style={{ transform: props.xy.interpolate(trans2) }} 
			/>
			<animated.div 
				class="card3" 
				style={{ transform: props.xy.interpolate(trans3) }} 
			/>
			<animated.div 
				class="card1" 
				style={{ transform: props.xy.interpolate(trans1) }} 
			/>
			<animated.div 
				class="card4" 
				style={{ transform: props.xy.interpolate(trans4) }} 
			/>
	    </div>
	)
}
export default ParallaxSpring;