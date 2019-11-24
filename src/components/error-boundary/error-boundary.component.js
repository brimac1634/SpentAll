import React, { Component } from 'react';

import iceCream from '../../assets/404.png';

import './error-boundary.styles.scss';

class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = {
			hasErrored: false
		}
	}

	static getDerivedStateFromError(error) {
		return { hasErrored: true }
	}

	componentDidCatch(error, info) {
		console.log(error);
	}

	render() {
		if (this.state.hasErrored) {
			return (
				<div className='error-boundary'>
					<img src={iceCream} alt='SpentAll' />
					<span>Oops! Something has gone wrong.</span>
					<span>Please try refreshing.</span>
				</div>
			)
		} 
		return this.props.children
	}
} 

export default ErrorBoundary;