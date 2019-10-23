import React from 'react';

import Profile from '../../components/profile/profile.component';
import SettingsContainer from '../../components/settings/settings.container';

import './profile-settings.styles.scss';

const ProfileSettings = () => (
	<div className='profile-settings'>
		<div className='box'>
			<Profile />
		</div>
		<div className='box'>
			<SettingsContainer />
		</div>
	</div>
)

export default ProfileSettings;