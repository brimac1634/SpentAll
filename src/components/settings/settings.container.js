import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsUserSettingsLoaded } from '../../redux/user/user.selectors';

import WithLoader from '../../components/with-loader/with-loader.component';
import Settings from './settings.component';

const mapStateToProps = createStructuredSelector({
	isLoading: state => !selectIsUserSettingsLoaded(state)
})

const SettingsContainer = compose(
	connect(mapStateToProps),
	WithLoader
)(Settings);

export default SettingsContainer;
 
