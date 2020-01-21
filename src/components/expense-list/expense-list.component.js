import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Collapsible from 'react-collapsible';

import { selectExpensesList, selectSelectedExpense, selectExpenseMap } from '../../redux/expenses/expenses.selectors';
import { setSelectedExpense, deleteExpenseStart } from '../../redux/expenses/expenses.actions';

import ListItem from '../list-item/list-item.component';
import ExpenditureDetails from '../expenditure-details/expenditure-details.component';
import SectionBox from '../../components/section-box/section-box.component';
import Checkbox from '../../components/checkbox/checkbox.component';

import './expense-list.styles.scss';

const mapStateToProps = createStructuredSelector({
	expenseList: selectExpensesList,
	expenseListMap: selectExpenseMap,
	selectedExpense: selectSelectedExpense
})

const mapDispatchToProps = dispatch => ({
	selectExpense: expense => dispatch(setSelectedExpense(expense)),
	deleteExpenseStart: expenseID => dispatch(deleteExpenseStart(expenseID)),
})

const ExpenseList = ({ expenseList, expenseListMap, selectExpense, selectedExpense }) => {
	const [checkedList, setCheckedList] = useState({});
	const checkListKeys = useMemo(()=>Object.keys(checkedList), [checkedList])
	const handleCheck = (key, list, fixedMap) => {
		let { [key]: _, ...theRest } = list;
		const newList = list[key] ? theRest : { ...theRest, [key]: fixedMap[key]}
		setCheckedList(newList)
	}
	const allAreSelected = useMemo(()=>checkListKeys.length === expenseList.length, [checkListKeys, expenseList])
	return (
		<div className='expense-list'>
			<div className='list-control'>
				<div>
					<Checkbox 
						selected={checkListKeys.length === expenseList.length}
						onClick={()=>setCheckedList(allAreSelected ? [] : expenseListMap)}
					/>
		            <span>{allAreSelected ? 'Unselect All' : 'Select All'}</span>
	            </div>
	            <span 
	            	className={`delete ${checkListKeys.length ? 'show' : null}`}
	            	onClick={()=>deleteExpenseStart()}
            	>
	            	Delete
	            </span>
			</div>
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
										key={i}
										selected={selected}
										expense={expense}
										onClick={()=>selectExpense(selected ? null : expense.expenditure_id)}
										checked={checkedList[i]}
										handleCheck={()=>handleCheck(i, checkedList, expenseListMap)}
									/>
								}
							>
								{
									selected &&
									<SectionBox style={{borderRadius: '0 0 3px 3px'}} >
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
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);