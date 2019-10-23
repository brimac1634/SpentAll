import React from 'react';
import './form-input.styles.scss';

const FormInput = ({ area, handleChange, label, ...otherProps }) => (
	<div className='group'>
		{
			label ? 
			(<label 
				className='form-input-label'
			>
				{label}
			</label>)
			: null
		}
		{
			area
			?	<textarea 
					className='form-input form-area' 
					onChange={handleChange} 
					{ ...otherProps }
				/>
			: 	<input 
					className='form-input' 
					onChange={handleChange} 
					{ ...otherProps }
				/>
		}
	</div>
)

export default FormInput;