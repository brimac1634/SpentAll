import React from 'react';

import './category.styles.scss';

const Category = ({ category, selected, onClick, onDelete, ...otherProps }) => (
	<div 
		className={`category ${onClick ? 'clickable' : null} ${selected ? 'selected' : null}`} 
		{...otherProps} 
		onClick={onClick}
	>
		<span>{category}</span>
		{
			onDelete &&
			<span
				className='delete'
				onClick={onDelete}
			>
				&#10005;
			</span>
		}
	</div>
)
export default Category;