import React from 'react';

import CustomButton from '../../components/custom-button/custom-button.component';

import './message-modal.styles.scss';

const MessageModal = ({ message, confirm, cancel, confirmCallback, cancelCallback }) => (
	<div className='message-modal'>
		<h3 className='message'>{message}</h3>
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