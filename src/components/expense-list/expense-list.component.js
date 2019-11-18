import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Collapsible from 'react-collapsible';

import { selectExpensesList, selectSelectedExpense } from '../../redux/expenses/expenses.selectors';
import { setSelectedExpense } from '../../redux/expenses/expenses.actions';

import ListItem from '../list-item/list-item.component';
import ExpenditureDetails from '../expenditure-details/expenditure-details.component';
import SectionBox from '../../components/section-box/section-box.component';

import './expense-list.styles.scss';

const mapStateToProps = createStructuredSelector({
	expenseList: selectExpensesList,
	selectedExpense: selectSelectedExpense
})

const mapDispatchToProps = dispatch => ({
	selectExpense: expense => dispatch(setSelectedExpense(expense))
})

const ExpenseList = ({ expenseList, selectExpense, selectedExpense }) => (
	<div className='expense-list'>
		<div className='list'>
			{
				expenseList &&
				expenseList.map((expense, i) => {
					const selected = expense === selectedExpense
					return (
						<Collapsible 
							key={i} 
							selected={selected}
							open={selected}
							trigger={
								<ListItem 
									selected={selected}
									expense={expense}
									onClick={()=>selectExpense(selected ? null : expense.expenditure_id)}
								/>
							}
						>
							{
								selected &&
								<SectionBox>
									<ExpenditureDetails />
								</SectionBox>
							}
						</Collapsible>
					)
				})
			}
		</div>
	</div>
)

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);