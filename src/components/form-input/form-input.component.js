import React, { useRef } from 'react';
import './form-input.styles.scss';

const FormInput = ({ area, handleChange, margin, label, id, ...otherProps }) => {
	const input = useRef(0);
	return (
		<div className={`group ${area ? 'area-group' : null}`} style={{margin: margin ? margin : null}}>
			{
				label ? 
				(<label 
					for={id}
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
						id={id}
						{ ...otherProps }
					/>
				: 	<input 
						ref={input}
						className='form-input' 
						onChange={handleChange}
						id={id} 
						{ ...otherProps }
					/>
			}
		</div>
	)
}

export default FormInput;