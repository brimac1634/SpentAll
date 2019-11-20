import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import SectionBox from '../../components/section-box/section-box.component';
import HoverBox from '../../components/hover-box/hover-box.component';

import { ReactComponent as Logo } from '../../assets/logo_square.svg'

import './welcome-info.styles.scss';

const WelcomeInfo = ({ history }) => {
	const [showAbout, setShowAbout] = useState(false);
	return (
		<div className='welcome-info'>
			<SectionBox>
				<div className='info-section'>
					<Logo />
					<h1>SpentAll</h1>
					<span className='sub-header'>Easy Expense Tracker</span>
					<CustomButton 
						onClick={()=>history.push('/welcome/sign-in')}
					> 
						login
					</CustomButton>
					<CustomButton  
						onClick={()=>history.push('/welcome/sign-up')}
					> 
						sign up
					</CustomButton>
					<div className='separator' />
					<CustomButton 
						selected={true}
						onClick={()=>setShowAbout(!showAbout)}
						type='button'
					> 
						tell me more
					</CustomButton>
				</div>
			</SectionBox>
			<HoverBox 
				show={showAbout} 
				backgroundClick={()=>setShowAbout(!showAbout)}
			>
				<div className='info-container'>
					<h2>What is SpentAll?</h2>
					<p className='info'>
					SpentAll is a simple-to-use spending tracker. Log your expenditures, categorize them, and track your spending habits. Customize your account by selecting your local currency, setting spending limits, and personalizing spending categories. Keep an eye on the spending guage on the home dashboard to help you stay conscious of your spending! Make use of the analytics page to see more detailed metrics into where your money goes, and when. This app is perfect for those simply looking to keep an eye on their expenditures. More functionalities coming soon! 
					</p>
					<CustomButton 
						selected
						onClick={()=>setShowAbout(!showAbout)}
					> 
						I'm Ready! 
					</CustomButton>
				</div>
			</HoverBox>
		</div>
	)
}
export default withRouter(WelcomeInfo);