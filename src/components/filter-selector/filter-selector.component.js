import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUserSettings } from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import Category from '../category/category.component';

import './filter-selector.styles.scss';

const mapStateToProps = createStructuredSelector({
	userSettings: selectUserSettings,
})

const FilterSelector = ({ options, select, userSettings }) => {
	const [search, setSearch] = useState('');
	const { currency } = userSettings;

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
			<div className='default'>
				<span>Default:</span>
				<Category
					category={currency}
					style={{width: '100px', margin: '0'}}
					onClick={()=>{
						select(currency)
						setSearch('')
					}}
				/>
			</div>
			<div className='options'>
				{
					options &&
					options.filter(option => {
						return option.includes(search.toUpperCase())
					}).sort().map((option, i)=>(
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
export default connect(mapStateToProps)(FilterSelector);