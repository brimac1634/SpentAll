import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Category from '../category/category.component';

import './filter-selector.styles.scss';

const FilterSelector = ({ options, select }) => {
	const [search, setSearch] = useState('');

	return (
		<div className='filter-selector'>
			<FormInput 
				name='search' 
				type='text' 
				value={search}
				label='filter'
				placeholder='USD'
				handleChange={e=>setSearch(e.target.value)}
			/>
			<div className='options'>
				{
					options &&
					options.filter(option => {
						return option.includes(search.toUpperCase())
					}).map((option, i)=>(
						<Category 
							key={i}
							category={option}
							style={{width: '100px', margin: '0'}}
							onClick={()=>{
								select(option)
								setSearch('')
							}}
						/>
					))
				}
			</div>
		</div>
	)
}
export default FilterSelector