import { createSelector } from 'reselect'

import { 
	checkDateRange, 
	formatDate,
	sortProperties 
} from '../../utils';

const selectExpenses = state => state.expenses;

const filterList = (list, dates) => {
	if (!list || !!!list.length) return null;
	const { startDate, endDate } = dates;
	return list.filter(({ timestamp }) => {
		return checkDateRange(new Date(timestamp), startDate, endDate)
	})
}

export const selectExpenseIsLoading = createSelector(
	[selectExpenses],
	expenses => expenses.isFetching
)

export const selectExpensesList = createSelector(
	[selectExpenses],
	({ expenses, dateRange }) => filterList(expenses, dateRange)
)

const expenseMapper = (list, byMonth) => {
	if (!list) return null;
	return list.reduce((accum, expense)=>{
		const { timestamp, amount } = expense;
		const key = formatDate(new Date(timestamp), false, byMonth);
		accum[key] = accum[key] 
			? 	accum[key] + amount
			: 	amount
		return accum
	}, {})
}

export const selectExpensesDateMap = createSelector(
	[selectExpensesList],
	expenseList => expenseMapper(expenseList, false)
)

export const selectExpensesMonthMap = createSelector(
	[selectExpensesList],
	expenseList => expenseMapper(expenseList, true)
)

export const selectTargetExpensesList = createSelector(
	[selectExpenses],
	({ expenses, cycleDateRange }) => filterList(expenses, cycleDateRange)
)

export const selectTimeFrame = createSelector(
	[selectExpenses],
	expenses => expenses.timeFrame
)

export const selectTimeTitle = createSelector(
	[selectTimeFrame],
	timeFrame => {
		switch (timeFrame) {
			case 'today':
				return 'today'
			case 'this week':
			case 'weekly':
				return 'this week'
			case 'this month':
			case 'monthly':
				return 'this month'
			case 'this year':
				return 'this year'
			default:
				return ''
		}
	}
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
	selectTotalExpenses,
	selectExpensesList,
	(total, expenses) => {
		if (!expenses) return null;
		let categoryMap = expenses.reduce((accum, expense) => {
			const { type, amount } = expense;
			accum[type] = accum[type]
				?	accum[type] + amount
				: 	amount
			return accum
		}, {})

		Object.keys(categoryMap).forEach(cat => {
			categoryMap[cat] = Number(categoryMap[cat] * 100 / total).toFixed(2);
		})
		
		const sortedArray = sortProperties(categoryMap).reduce((accum, array) => {
			accum[array[0]] = array[1]
			return accum
		}, {})
		return sortedArray;
	}
)

export const selectCurrencies = createSelector(
	[selectExpenses],
	({ currencies }) => {
		const ordered = Object.keys(currencies).sort().reduce((accum, cur) => {
			accum[cur] = currencies[cur];
			return accum;
		}, {})
		return ordered;
	}
)




