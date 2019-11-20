import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { validateEmail } from '../../utils';

import { selectMessage } from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import HoverBox from '../../components/hover-box/hover-box.component';
import MessageModal from '../../components/message-modal/message-modal.component';
import SectionBox from '../../components/section-box/section-box.component';
import FacebookButton from '../../components/facebook-button/facebook-button.component';

import { resetStart, emailSignUpStart, setSuccessMessage } from '../../redux/user/user.actions';

import './sign-up-form.styles.scss';

const mapStateToProps = createStructuredSelector({
	signUpMessage: selectMessage
})

const mapDispatchToProps = dispatch => ({
	emailSignUpStart: (name, email) => dispatch(emailSignUpStart({ name, email })),
	resetStart: email => dispatch(resetStart({ email })),
	setSuccessMessage: message => dispatch(setSuccessMessage(message))
})

const SignUpForm = ({ isReset, emailSignUpStart, resetStart, signUpMessage, setSuccessMessage, history }) => {
	const [userCredentials, setCredentials] = useState({name: '', email: ''});
	const [showMessasge, setshowMessage] = useState(true);
	const { name, email } = userCredentials;


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

	const handleMessage = () => {
		setshowMessage(false);
		setTimeout(()=>setSuccessMessage(null), 100)
		setTimeout(()=>setshowMessage(true), 200)
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
				<HoverBox show={!!signUpMessage && showMessasge}>
					<MessageModal
						title='Email Sent'
						message={signUpMessage}
						confirm='okay' 
						confirmCallback={handleMessage}
					/>
				</HoverBox>
			</SectionBox>
		</div>
	)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm));