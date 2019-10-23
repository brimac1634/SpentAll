import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './profile.styles.scss';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(signOutStart())
})

const Profile = ({ currentUser, logout }) => {
	if (!currentUser) return <span>Not Currently Logged In</span>
	const { userName } = currentUser;

	return (
		<div className='profile'>
			<h3>Welcome, {userName}</h3>
			<CustomButton
				selected
				onClick={logout}
			> 
				logout
			</CustomButton>
		</div>
	)
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);