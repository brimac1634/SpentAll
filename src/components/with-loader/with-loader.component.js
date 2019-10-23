import React from 'react';

import Loader from '../loader/loader.component';

const WithLoader = WrappedComponent => ({ isLoading, ...otherProps}) => {
	return isLoading ? (
		<Loader />
	) : (
		<WrappedComponent { ...otherProps } />
	)
}

export default WithLoader;