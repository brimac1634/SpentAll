import { createSelector } from 'reselect'
import moment from 'moment';

import { checkDateRange } from '../../utils';

const selectExpenses = state => state.expenses;

export const selectExpensesList = createSelector(
	[selectExpenses],
	expense => {
		const { expenses, timeFrame, dateRange } = expense;
		if (!expenses) return null;
		const today = new Date();
		const date = timestamp => new Date(timestamp);
		switch (timeFrame) {
			case 'this year':
				return expenses.filter(({ timestamp }) => {
					return date(timestamp).getFullYear() === today.getFullYear();
				})
			case 'this month':
				return expenses.filter(({ timestamp }) => {
					return date(timestamp).getMonth() === today.getMonth();
				})
			case 'this week':
				return expenses.filter(({ timestamp }) => {
					const dayOfWeek = today.getDay();
					return date(timestamp).getDate() >= today.getDate() - dayOfWeek;
				})
			case 'today':
				return expenses.filter(({ timestamp}) => {
					return date(timestamp).getDate() === today.getDate();
				})
			case 'last 30 days':
				return expenses.filter(({ timestamp}) => {
					return date(timestamp).getDate() >= today.getDate() - 30;
				})
			case 'last 7 days':
				return expenses.filter(({ timestamp}) => {
					return date(timestamp).getDate() >= today.getDate() - 7;
				})
			case 'date range':
				const { startDate, endDate } = dateRange;
				return expenses.filter(({ timestamp }) => {
					const expenseDate = date(timestamp)
					return checkDateRange(expenseDate, startDate, endDate)
				})
			default:
				return expenses.filter(({ timestamp }) => {
					return date(timestamp).getMonth() === new Date().getMonth();
				})
		}
	}
)

export const selectTimeFrame = createSelector(
	[selectExpenses],
	expenses => expenses.timeFrame
)

export const selectDateRange = createSelector(
	[selectExpenses],
	expenses => {
		const now = moment();
		return expenses.timeFrame === 'date range' 
		?	expenses.dateRange
		: 	{ startDate: now.clone(), endDate: now.clone() }
	}
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


