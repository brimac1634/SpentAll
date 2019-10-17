import { createSelector } from 'reselect';

const selectLoading = state => state.loading;

export const selectIsLoading = createSelector(
	[selectLoading],
	loading => loading.isLoading
)

export const selectLoadingMessage = createSelector(
	[selectLoading],
	loading => loading.message
)