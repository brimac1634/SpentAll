import React from 'react';

import CustomButton from '../../components/custom-button/custom-button.component';

import './message-modal.styles.scss';

const MessageModal = ({ title, message, confirm, cancel, confirmCallback, cancelCallback }) => (
	<div className='message-modal'>
		<h1>{title}</h1>
		<span className='message'>{message}</span>
		<div className='button-container'>
			{
				cancel &&
				<CustomButton onClick={cancelCallback}>
					{cancel}
				</CustomButton>
			}
			{
				confirm &&
				<CustomButton onClick={confirmCallback}>
					{confirm}
				</CustomButton>
			}
		</div>
	</div>
)

export default MessageModal;