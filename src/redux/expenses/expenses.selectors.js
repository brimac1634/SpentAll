import { createSelector } from 'reselect'

const selectExpenses = state => state.expenses;

export const selectExpensesList = createSelector(
	[selectExpenses],
	expenses => expenses.expenses
)

export const selectTotalExpenses = createSelector(
	[selectExpensesList],
	expenses => expenses
		?	expenses.reduce((accum, expense) => {
				return accum + expense.amount
			}, 0)
		: null
)

export const selectAreExpensesFetching = createSelector(
	[selectExpenses],
	expenses => expenses.isFetching
)
