import { createSelector } from 'reselect'

import { checkDateRange } from '../../utils';

const selectExpenses = state => state.expenses;

export const selectExpensesList = createSelector(
	[selectExpenses],
	expense => {
		const { expenses, dateRange } = expense;
		if (!expenses) return null;
		const { startDate, endDate } = dateRange;
		return expenses.filter(({ timestamp }) => {
			return checkDateRange(new Date(timestamp), startDate, endDate)
		})
	}
)

export const selectTimeFrame = createSelector(
	[selectExpenses],
	expenses => expenses.timeFrame
)

export const selectDateRange = createSelector(
	[selectExpenses],
	expenses => expenses.dateRange
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


