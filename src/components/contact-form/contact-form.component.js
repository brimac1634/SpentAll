import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axiosConfig from '../../axios-config';

import { setAlert } from '../../redux/alert/alert.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import Loader from '../loader/loader.component';

import './contact-form.styles.scss';

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
})

const mapDisptachToProps = dispatch => ({
	setAlert: message => dispatch(setAlert(message))
})

const ContactForm = ({ currentUser, setAlert }) => {
	const [newMessage, setNewMessage] = useState({
		fullName: '',
		email: '',
		subject: '',
		message: ''
	});
	const [isLoading, setIsLoading] = useState(false);
	const { fullName, email, subject, message } = newMessage;
	
	useEffect(() => {
		if (currentUser) {
			const { name, email } = currentUser;
			setNewMessage({
				fullName: name,
				email,
				subject: '',
				message: ''
			})
		}
	}, [currentUser])

	const handleSubmit = async event => {
		event.preventDefault();
		setIsLoading(true);
		axiosConfig('post', '/contact-us', newMessage)
		.then(() => {
			setIsLoading(false);
			setAlert('Your message has been sent')
			setNewMessage({ 
				fullName: '',
				email: '',
				subject: '',
				message: ''
			})
		}).catch(err => {
			setIsLoading(false);
			setAlert(err.title)
		});
	}

	const handleChange = event => {
		const { value, name } = event.target;
		setNewMessage({ ...newMessage, [name]: value});
	}

	return (
		<div className='contact-form'>
			<div className='contact-interior'>
				<h2>Contact Us</h2>
				<form onSubmit={handleSubmit}>
					<FormInput 
						name='fullName' 
						type='text' 
						value={fullName} 
						label='Full Name'
						handleChange={handleChange}
						required 
					/>
					<FormInput 
						name='email' 
						type='email' 
						value={email} 
						label='Email'
						handleChange={handleChange}
						required 
					/>
					<FormInput 
						name='subject' 
						type='text' 
						value={subject} 
						label='Subject'
						handleChange={handleChange}
						required 
					/>
					<FormInput 
						area
						name='message' 
						type='text' 
						value={message} 
						label='Message'
						handleChange={handleChange}
						required 
					/>
					<div className='buttons'>
						<CustomButton type='submit'> Submit </CustomButton>
					</div>
				</form>
				{
					isLoading &&
	                <Loader fixed />
				}
			</div>
		</div>
	)
}

export default connect(mapStateToProps, mapDisptachToProps)(ContactForm);