import { createSelector } from 'reselect'

import { checkDateRange, formatDate, sortProperties } from '../../utils';

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

export const selectExpensesDateMap = createSelector(
	[selectExpensesList],
	expenseList => {
		if (!expenseList) return null;
		return expenseList.reduce((accum, expense)=>{
			const { timestamp, amount } = expense;
			const date = formatDate(new Date(timestamp));
			accum[date] = accum[date] 
				? 	accum[date] + amount
				: 	amount
			return accum
		}, {})
	}
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

export const selectShowAddExpense = createSelector(
	[selectExpenses],
	expenses => expenses.showAddExpense
)

export const selectFixedDateRange = createSelector(
	[selectExpenses],
	({ dateRange }) => {
		const { startDate, endDate } = dateRange;
		if (startDate === endDate || startDate < endDate) {
			return dateRange;
		} else {
			return { startDate: endDate, endDate: startDate }
		}
	}
)

export const selectDatesArray = createSelector(
	[selectFixedDateRange],
	({ startDate, endDate }) => {
		if (!startDate || !endDate) return [];
		let currentDate = startDate.clone()
		let datesArray = [];
		while(currentDate <= endDate) {
			const formattedDate = formatDate(currentDate.toDate());
			datesArray.push(formattedDate);
			currentDate.add(1, 'd');
		}
		return datesArray;
	}
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

export const selectIsTotalTargetExpensesLoaded = createSelector(
	[selectTotalTargetExpenses],
	totalTargetExpenses => !!totalTargetExpenses
)

export const selectAreExpensesFetching = createSelector(
	[selectExpenses],
	expenses => expenses.isFetching
)

export const selectSelectedExpense = createSelector(
	[selectExpenses],
	({ selectedExpense, expenses }) => {
		if (!expenses) return null;
		return expenses.filter(({ expenditure_id }) => {
			return expenditure_id === selectedExpense
		})[0] || null
	}
)

export const selectExpenseToEdit = createSelector(
	[selectExpenses],
	expenses => expenses.expenseToEdit
)

export const selectCategoriesTotals = createSelector(
	[selectExpensesList],
	expenses => {
		if (!expenses) return null;
		const categoryMap = expenses.reduce((accum, expense) => {
			const { type, amount } = expense;
			accum[type] = accum[type]
				?	accum[type] + amount
				: 	amount
			return accum
		}, {})
		
		const sortedArray = sortProperties(categoryMap).reduce((accum, array) => {
			accum[array[0]] = array[1]
			return accum
		}, {})
		return sortedArray;
	}
)




