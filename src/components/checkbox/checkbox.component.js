import React from 'react';

import './checkbox.styles.scss';

const Checkbox = ({ selected, ...otherProps }) => (
	<div className={`checkbox ${selected ? 'selected' : null}`} { ...otherProps } />
)
export default Checkbox;