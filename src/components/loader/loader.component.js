import React from 'react';

import './loader.styles.scss';

const Loader = ({ message, fixed }) => (
	<div className={`loader ${fixed ? 'fixed' : 'absolute'}`}>
		<div className='ellipsis'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<div className='content'>
			<h4>{message || ''}</h4>
		</div>
	</div>
)

export default Loader;