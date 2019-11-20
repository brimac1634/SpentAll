import React from 'react';

import Profile from '../../components/profile/profile.component';
import SettingsContainer from '../../components/settings/settings.container';
import SectionBox from '../../components/section-box/section-box.component';
import ContactForm from '../../components/contact-form/contact-form.component';
import CollapseBar from '../../components/collapse-bar/collapse-bar.component';

import './profile-settings.styles.scss';

const ProfileSettings = () => (
	<div className='profile-settings'>
		<CollapseBar label='profile'>
			<SectionBox>
				<Profile />
			</SectionBox>
		</CollapseBar>
		<CollapseBar label='settings'>
			<SectionBox>
				<SettingsContainer />
			</SectionBox>
		</CollapseBar>
		<CollapseBar label='contact us'>
			<SectionBox>
				<ContactForm />
			</SectionBox>
		</CollapseBar>
	</div>
)

export default ProfileSettings;