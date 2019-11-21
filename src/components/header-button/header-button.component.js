import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import './header-button.styles.scss';
const HeaderButton = ({ children, to, location, ...otherProps }) => (
	<Link to={to} className={`header-button ${location.pathname === to ? 'selected' : null}`}>
		{ children }
	</Link>
)
export default withRouter(HeaderButton);