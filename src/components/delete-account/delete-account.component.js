import React, { useState } from 'react';
import { connect } from 'react-redux';

import { deleteAccountStart } from '../../redux/user/user.actions';

import CustomButton from '../custom-button/custom-button.component';
import HoverBox from '../../components/hover-box/hover-box.component';
import MessageModal from '../../components/message-modal/message-modal.component';

const mapDispatchToProps = dispatch => ({
	deleteAccount: () => dispatch(deleteAccountStart())
})

const DeleteAccount = ({ deleteAccount }) => {
	const [showModal, setShowModal] = useState(false);
	return (
		<div>
			<CustomButton
				onClick={()=>setShowModal(true)}
			> 
				delete account
			</CustomButton>
			<HoverBox show={showModal}>
				<MessageModal
					title='Account Deletion'
					message='Are you sure? All data and settings will be lost.'
					confirm='delete' 
					cancel='cancel'
					confirmCallback={()=>deleteAccount()} 
					cancelCallback={()=>setShowModal(false)}
				/>
			</HoverBox>
		</div>
	)
}
export default connect(null, mapDispatchToProps)(DeleteAccount);