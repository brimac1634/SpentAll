import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { validateEmail } from '../../utils';

import { selectMessage } from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import SectionBox from '../../components/section-box/section-box.component';
import FacebookButton from '../../components/facebook-button/facebook-button.component';

import { resetStart, emailSignUpStart } from '../../redux/user/user.actions';

import './sign-up-form.styles.scss';

const mapStateToProps = createStructuredSelector({
	successMessage: selectMessage
})

const mapDispatchToProps = dispatch => ({
	emailSignUpStart: (name, email) => dispatch(emailSignUpStart({ name, email })),
	resetStart: email => dispatch(resetStart({ email }))
})

const SignUpForm = ({ isReset, emailSignUpStart, resetStart, successMessage, history }) => {
	const [userCredentials, setCredentials] = useState({name: '', email: ''});
	const { name, email } = userCredentials;

	useEffect(()=>{
		if (successMessage) {
			history.push('/welcome/email-sent')
		}
	}, [successMessage, history])

	const handleSubmit = async event => {
		event.preventDefault();
		if (isReset) {
			resetStart(email);
		} else {
			emailSignUpStart(name, email);
		}
	}

	const handleChange = event => {
		const { value, name } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	}

	return (
		<div className='sign-up-form'>
			<SectionBox>
				<h2>{isReset ? 'Password Reset' : 'Sign Up'}</h2>
				<form onSubmit={handleSubmit}>
					{
						!isReset &&
						<FormInput 
							name='name' 
							type='text' 
							value={name} 
							label='name'
							handleChange={handleChange}
							required 
						/>
					}
					<FormInput 
						name='email' 
						type='email' 
						value={email} 
						label='email'
						handleChange={handleChange}
						required 
					/>
					<div className='button'>
						<CustomButton 
							disabled={(!isReset && !name) || !validateEmail(email)}
							selected
							type='submit'
						> 
							{isReset ? 'reset' : 'sign up'} 
						</CustomButton>
						{
							!isReset &&
							<div className='sign-up-column'>
								<span className='separator-text'>OR</span>
								<FacebookButton 
									label='sign up with Facebook'
								/>
							</div>
						}
					</div>
				</form>
				<div className='login'>
				    <CustomButton 
						selected
						onClick={()=>history.push('/welcome/sign-in')}
					> 
						Login 
					</CustomButton>
				</div>
			</SectionBox>
		</div>
	)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm));