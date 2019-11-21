import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import { selectMessage } from '../../redux/user/user.selectors';

import SectionBox from '../../components/section-box/section-box.component';
import CustomButton from '../custom-button/custom-button.component';

import './email-sent.styles.scss';

const mapStateToProps = createStructuredSelector({
	message: selectMessage
})

const EmailSent = ({ history, message }) => {
	if (!message) history.push('/welcome');
	return (
		<div className='email-sent'>
			<SectionBox>
				<h1>Email Sent</h1>
				<span className='message'>{ message }</span>
				<CustomButton 
					onClick={()=>history.push('/welcome')}
				> 
					Go to homepage 
				</CustomButton>
			</SectionBox>
		</div>
	)
}
export default connect(mapStateToProps)(EmailSent);
