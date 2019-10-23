import React from 'react';

import Profile from '../../components/profile/profile.component';
import Settings from '../../components/settings/settings.component';

import './profile-settings.styles.scss';

const ProfileSettings = () => (
	<div className='profile-settings'>
		<div className='box'>
			<Profile />
		</div>
		<div className='box'>
			<Settings />
		</div>
	</div>
)

export default ProfileSettings;