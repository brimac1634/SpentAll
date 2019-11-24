import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart, resetStart } from '../../redux/user/user.actions';

import CustomButton from '../custom-button/custom-button.component';

import './profile.styles.scss';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(signOutStart()),
	resetStart: email => dispatch(resetStart({ email }))
})

const Profile = ({ match, history, currentUser, logout }) => {
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
					onClick={()=>history.push(`/user/account/new-password`)}
				> 
					change password
				</CustomButton>
			</div>
		</div>
	)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));