import React from 'react';
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login';

import { signInWithFacebookStart } from '../../redux/user/user.actions';

import './facebook-button.styles.scss';

const mapDispatchToProps = dispatch => ({
	signInWithFacebookStart: response => dispatch(signInWithFacebookStart(response))
})

const FacebookButton = ({ label, signInWithFacebookStart }) => (
	<FacebookLogin
        appId='1337514576424164'
        fields='name,email'
        cssClass='custom-fb-button'
        callback={signInWithFacebookStart}
        disableMobileRedirect={true}
        textButton={label}
    />
)
export default connect(null, mapDispatchToProps)(FacebookButton);