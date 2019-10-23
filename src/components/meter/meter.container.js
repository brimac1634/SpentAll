import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsUserSettingsLoaded } from '../../redux/user/user.selectors';

import WithLoader from '../../components/with-loader/with-loader.component';
import Meter from './meter.component';

const mapStateToProps = createStructuredSelector({
	isLoading: state => !selectIsUserSettingsLoaded(state)
})

const MeterContainer = compose(
	connect(mapStateToProps),
	WithLoader
)(Meter);

export default MeterContainer;
 
