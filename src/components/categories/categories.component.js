import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Category from '../category/category.component';
import LabelGroup from '../label-group/label-group.component';
import CustomButton from '../custom-button/custom-button.component';

import './categories.styles.scss';

const Categories = ({ settings, setSettings }) => {
	const [category, setCategory] = useState('');
	let { categories } = settings;

	const addCategory = category => {
		category = category.toLowerCase();
		categories = categories ? [...categories, category] : [category]
		setSettings({ ...settings, categories });
		setCategory('');
	}

	const removeFromArray = (array, index) => {
		array.splice(index, 1);
		setSettings({ ...settings, categories: array });
	}

	return (
		<div className='categories-input'>
			<LabelGroup
				label='add a new spending category'
			>
				<div className='cat-row'>
					<FormInput 
						type='text'
						label='new category'
						value={category}
						margin='0'
						placeholder='example: entertainment'
						handleChange={e=>setCategory(e.target.value)}
						onKeyPress={e=>{
							if (e.which !== 13) return;
							e.preventDefault();
							addCategory(category)
						}}
					/>
					<CustomButton
						onClick={()=>addCategory(category)}
					> 
						 Add
					</CustomButton>
				</div>
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