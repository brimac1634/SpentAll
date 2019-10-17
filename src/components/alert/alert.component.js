import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectMessage, selectAlertIsShowing } from '../../redux/alert/alert.selectors';
import { toggleAlert } from '../../redux/alert/alert.actions';

import './alert.styles.scss';

const mapStateToProps = createStructuredSelector({
	isShowing: selectAlertIsShowing,
	message: selectMessage
})

const mapDispatchToProps = dispatch => ({
	toggleAlert: () => dispatch(toggleAlert())
})

const Alert = ({ isShowing, message, toggleAlert }) => {
	const animate = isShowing ? 'fade-in' : 'fade-out';

	if (isShowing) setTimeout(()=>toggleAlert(), 4000)

	return (
		<div className={`alert ${animate}`}>
			<span className='message'>{ message }</span>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);