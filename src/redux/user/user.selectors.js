import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
	[selectUser],
	user => user.currentUser
)

export const selectUserSettings = createSelector(
	[selectUser],
	user => user.userSettings
)

export const selectIsUserSettingsLoaded = createSelector(
	[selectUser],
	user => !!user.userSettings
)

export const selectIsUserFetching = createSelector(
	[selectUser],
	user => user.isFetching
)

export const selectUserError = createSelector(
	[selectUser],
	user => user.error
)

export const selectCurrency = createSelector(
	[selectUser],
	({ userSettings }) => userSettings ? userSettings.currency : null
)
