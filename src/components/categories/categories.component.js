import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Category from '../category/category.component';

import './categories.styles.scss';

const Categories = ({ settings, setSettings }) => {
	const [category, setCategory] = useState('');
	let { categories } = settings;

	const handleNewCategory = event => {
		if (event.which === 13) {
			event.preventDefault();
			const { value } = event.target;
			categories = categories ? [...categories, value] : [value]
			setSettings({ ...settings, categories });
			setCategory('');
		}
	}

	const removeFromArray = (array, index) => {
		array.splice(index, 1);
		setSettings({ ...settings, categories: array });
	}

	return (
		<div className='categories-input'>
			<span className='label'>add or remove spending categories</span>
			<FormInput 
				name='category' 
				type='text'
				label='new category'
				value={category}
				margin='0'
				placeholder='entertainment'
				handleChange={e=>setCategory(e.target.value)}
				onKeyPress={handleNewCategory}
			/>
			<div className='categories'>
				{
					categories &&
					categories.map((category, i)=>(
						<Category 
							key={i}
							category={category}
							onDelete={()=>removeFromArray(categories, i)}
						/>
					))
				}
			</div>
		</div>
	)
}

export default Categories;