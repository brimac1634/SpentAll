import { createSelector } from 'reselect'

const selectExpenses = state => state.expenses;

export const selectExpensesList = createSelector(
	[selectExpenses],
	expenses => expenses.expenses
)

export const selectAreExpensesFetching = createSelector(
	[selectExpenses],
	expenses => expenses.isFetching
)
