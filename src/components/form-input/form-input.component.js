import React, { useRef } from 'react';
import './form-input.styles.scss';

const FormInput = ({ area, handleChange, margin, label, ...otherProps }) => {
	const input = useRef(0);
	return (
		<div className={`group ${area ? 'area-group' : null}`} style={{margin: margin ? margin : null}}>
			{
				label ? 
				(<label 
					onClick={()=>{
						input.current.focus()
					}}
					className='form-input-label'
				>
					{label}
				</label>)
				: null
			}
			{
				area
				?	<textarea 
						ref={input}
						className='form-input form-area' 
						onChange={handleChange} 
						{ ...otherProps }
					/>
				: 	<input 
						ref={input}
						className='form-input' 
						onChange={handleChange} 
						{ ...otherProps }
					/>
			}
		</div>
	)
}

export default FormInput;