import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReactTooltip from 'react-tooltip'

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
				type='text' 
				value={search}
				label='filter'
				placeholder='example: USD'
				handleChange={e=>setSearch(e.target.value)}
			/>
			{
				currency &&
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
			}
			<div className='options'>
				{
					options &&
					Object.keys(options).filter(option => {
						return option.includes(search.toUpperCase())
					}).map((option, i)=>(
						<div key={i}>
							<div data-tip={options[option].currencyName} data-for={options[option].id}>
								<Category 
									category={option}
									style={{width: '100px', margin: '0'}}
									onClick={()=>{
										select(option)
										setSearch('')
									}}
								/>
							</div>
							<ReactTooltip 
								className='tool-tip'
								id={options[option].id} 
								data-html
								insecure
								effect='solid' 
								multiline 
							/>
						</div>
					))
				}
			</div>
		</div>
	)
}
export default connect(mapStateToProps)(FilterSelector);