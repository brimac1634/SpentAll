import React from 'react';

import Profile from '../../components/profile/profile.component';
import SettingsContainer from '../../components/settings/settings.container';
import SectionBox from '../../components/section-box/section-box.component';

import './profile-settings.styles.scss';

const ProfileSettings = () => (
	<div className='profile-settings'>
		<div className='panel'>
			<SectionBox>
				<Profile />
			</SectionBox>
		</div>
		<div className='panel'>
			<SectionBox>
				<SettingsContainer />
			</SectionBox>
		</div>
	</div>
)

export default ProfileSettings;