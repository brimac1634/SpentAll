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
	const [showAbout, setShowAbout] = useState(false);
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
							<span className='but'>BUT WAIT...</span>
						}
						{
							!isReset &&
							<CustomButton 
								selected={(!name && !email)}
								onClick={()=>setShowAbout(!showAbout)}
								type='button'
							> 
								What is SpentAll?
							</CustomButton>
						}
					</div>
				</form>
				<div className='login'>
				    <CustomButton 
						selected
						onClick={()=>history.push('/welcome')}
					> 
						Login 
					</CustomButton>
				</div>
				<HoverBox show={!!signUpMessage && showMessasge}>
					<MessageModal
						title='Success'
						message={signUpMessage}
						confirm='okay' 
						confirmCallback={handleMessage}
					/>
				</HoverBox>
				{
					!isReset &&
					<HoverBox 
						show={showAbout} 
						backgroundClick={()=>setShowAbout(!showAbout)}
					>
						<div className='info-container'>
							<h2>What is SpentAll?</h2>
							<p className='info'>
							SpentAll is a simple-to-use spending tracker. Log your expenditures, categorize them, and track your spending habits. Customize your account by selecting your local currency, setting spending limits, and personalizing spending categories. Keep an eye on the spending guage on the home dashboard to help you stay conscious of your spending! Make use of the analytics page to see more detailed metrics into where your money goes, and when. This app is perfect for those simply looking to keep an eye on their expenditures. More functionalities coming soon! 
							</p>
							<CustomButton 
								selected
								onClick={()=>setShowAbout(!showAbout)}
							> 
								I'm Ready! 
							</CustomButton>
						</div>
					</HoverBox>
				}
			</SectionBox>
		</div>
	)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm));