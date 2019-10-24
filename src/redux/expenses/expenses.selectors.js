import { createSelector } from 'reselect'

import { checkDateRange } from '../../utils';

const selectExpenses = state => state.expenses;

const filterList = (list, dates) => {
	if (!list) return null;
	const { startDate, endDate } = dates;
	return list.filter(({ timestamp }) => {
		return checkDateRange(new Date(timestamp), startDate, endDate)
	})
}

export const selectExpensesList = createSelector(
	[selectExpenses],
	({ expenses, dateRange }) => filterList(expenses, dateRange)
)

export const selectTargetExpensesList = createSelector(
	[selectExpenses],
	({ expenses, cycleDateRange }) => filterList(expenses, cycleDateRange)
)

export const selectTimeFrame = createSelector(
	[selectExpenses],
	expenses => expenses.timeFrame
)

export const selectDateRange = createSelector(
	[selectExpenses],
	expenses => expenses.dateRange
)

const getTotalValue = list => {
	return list
		?	list.reduce((accum, item) => {
				return accum + item.amount
			}, 0)
		: 0
}

export const selectTotalExpenses = createSelector(
	[selectExpensesList],
	expenses => getTotalValue(expenses)
)

export const selectTotalTargetExpenses = createSelector(
	[selectTargetExpensesList],
	expenses => getTotalValue(expenses)
)

// change to total target
export const selectIsTotalExpensesLoaded = createSelector(
	[selectTotalExpenses],
	totalExpenses => !!totalExpenses
)

export const selectAreExpensesFetching = createSelector(
	[selectExpenses],
	expenses => expenses.isFetching
)


