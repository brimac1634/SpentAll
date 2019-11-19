import React from 'react';

import './section-box.styles.scss';

const SectionBox = ({ children, ...otherProps }) => (
	<div className='section-box' { ...otherProps }>
		{ children }
	</div>
)
export default SectionBox;