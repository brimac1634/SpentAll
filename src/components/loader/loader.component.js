import React from 'react';

import { ReactComponent as LogoSquare } from '../../assets/logo_square.svg'

import './loader.styles.scss';

const Loader = ({ message, fixed, logo }) => (
	<div className={`loader ${fixed ? 'fixed' : 'absolute'}`}>
		{
			logo &&
			<LogoSquare />
		}
		<div className='ellipsis'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		{
			message &&
			<div className='content'>
				<h4>{message || ''}</h4>
			</div>
		}
	</div>
)

export default Loader;