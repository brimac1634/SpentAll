import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Category from '../category/category.component';
import LabelGroup from '../label-group/label-group.component';

import './categories.styles.scss';

const Categories = ({ settings, setSettings }) => {
	const [category, setCategory] = useState('');
	let { categories } = settings;

	const handleNewCategory = event => {
		if (event.which === 13) {
			event.preventDefault();
			let { value } = event.target;
			value = value.toLowerCase();
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
			<LabelGroup
				label='create your own spending categories'
			>
				<FormInput 
					type='text'
					label='new category'
					value={category}
					margin='0'
					placeholder='example: entertainment'
					handleChange={e=>setCategory(e.target.value)}
					onKeyPress={handleNewCategory}
				/>
			</LabelGroup>
			<LabelGroup
				label='current categories'
				tooltip='These will be your category options when adding new expenditures.'
			>
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
			</LabelGroup>
		</div>
	)
}

export default Categories;