import React, { useState } from 'react';

import MeterContainer from '../../components/meter/meter.container';
import ParallaxSpring from '../../components/parallax-spring/parallax-spring.component';

import './home.styles.scss';

const Home = () => {
	const [props, set] = useState({ x: 0, y: 0 });
	const { x, y } = props;
	return (
		<div className='home' onMouseMove={({ clientX: x, clientY: y }) => set({ x, y })}>
			<ParallaxSpring x={x} y={y} />
			<MeterContainer />
		</div>
	)
}

export default Home;