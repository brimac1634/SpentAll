import React from 'react';
import './form-input.styles.scss';

const FormInput = ({ area, handleChange, label, ...otherProps }) => (
	<div className='group'>
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
		{
			label ? 
			(<label 
				className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}
			>
				{label}
			</label>)
			: null
		}
	</div>
)

export default FormInput;