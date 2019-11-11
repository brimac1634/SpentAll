import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart, deleteAccountStart } from '../../redux/user/user.actions';

import CustomButton from '../custom-button/custom-button.component';
import HoverBox from '../../components/hover-box/hover-box.component';
import MessageModal from '../../components/message-modal/message-modal.component';

import './profile.styles.scss';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(signOutStart()),
	deleteAccount: () => dispatch(deleteAccountStart())
})

const Profile = ({ currentUser, logout, deleteAccount }) => {
	const [showModal, setShowModal] = useState(false);
	if (!currentUser) return <span>Not Currently Logged In</span>
	const { userName } = currentUser;

	return (
		<div className='profile'>
			<h3>Welcome, {userName}</h3>
			<div className='buttons'>
				<CustomButton
					selected
					onClick={logout}
				> 
					logout
				</CustomButton>
				<CustomButton
					onClick={()=>setShowModal(true)}
				> 
					delete account
				</CustomButton>
			</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);