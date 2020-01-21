import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Collapsible from 'react-collapsible';

import { selectExpensesList, selectSelectedExpense, selectExpenseMap } from '../../redux/expenses/expenses.selectors';
import { setSelectedExpense, deleteExpenseStart } from '../../redux/expenses/expenses.actions';

import ListItem from '../list-item/list-item.component';
import ExpenditureDetails from '../expenditure-details/expenditure-details.component';
import SectionBox from '../../components/section-box/section-box.component';
import Checkbox from '../../components/checkbox/checkbox.component';
import HoverBox from '../../components/hover-box/hover-box.component';
import MessageModal from '../../components/message-modal/message-modal.component';

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

const ExpenseList = ({ deleteExpenseStart, expenseList, expenseListMap, selectExpense, selectedExpense }) => {
	const [showModal, setShowModal] = useState(false);
	const [checkedList, setCheckedList] = useState({});
	const checkListKeys = useMemo(()=>Object.keys(checkedList), [checkedList])

	const handleCheck = (key, list, fixedMap) => {
		let { [key]: _, ...theRest } = list;
		const newList = list[key] ? theRest : { ...theRest, [key]: fixedMap[key]}
		setCheckedList(newList)
	}

	const allAreSelected = useMemo(()=>checkListKeys.length === expenseList.length, [checkListKeys, expenseList])

	const deleteExpense = async expenditureIDs => {
		setShowModal(false);
		deleteExpenseStart({ expenditureIDs });
	}

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
	            	onClick={()=>deleteExpenseStart({
	            		expenditureIDs: Object.keys(checkedList)
	            	})}
            	>
	            	Delete
	            </span>
			</div>
			<div className='list'>
				{
					expenseList &&
					expenseList.map((expense, i) => {
						const selected = expense === selectedExpense
						const id = expense.expenditure_id;
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
										checked={checkedList[id]}
										handleCheck={()=>handleCheck(id, checkedList, expenseListMap)}
									/>
								}
							>
								{
									selected &&
									<SectionBox style={{borderRadius: '0 0 3px 3px'}} >
										<ExpenditureDetails 
											handleDelete={()=>setShowModal(true)} 
										/>
									</SectionBox>
								}
							</Collapsible>
						)
					})
				}
			</div>
			{
				ReactDOM.createPortal(
					<HoverBox show={showModal}>
						<MessageModal
							title='Delete Expense'
							message='Are you sure?'
							confirm='delete' 
							cancel='cancel'
							confirmCallback={()=>deleteExpense([selectedExpense.expenditure_id])} 
							cancelCallback={()=>setShowModal(false)}
						/>
					</HoverBox>
				, document.body)
			}
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);