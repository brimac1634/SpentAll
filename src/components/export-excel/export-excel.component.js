import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { formatDate } from '../../utils';

import { selectTotalExpenses, selectFixedDateRange,
selectCurrencySymbol, selectExpensesList } from '../../redux/expenses/expenses.selectors';

import CustomButton from '../../components/custom-button/custom-button.component';

const mapStateToProps = createStructuredSelector({
	expenseList: selectExpensesList,
	totalExpense: selectTotalExpenses,
	dateRange: selectFixedDateRange,
	currency: selectCurrencySymbol
})

const ExportExcel = ({ expenseList, totalExpense, dateRange, currency }) => {
	
	let { startDate, endDate } = dateRange;
	startDate = useMemo(()=>formatDate(startDate.toDate()), [startDate]);
	endDate = useMemo(()=>formatDate(endDate.toDate()), [endDate]);
	const dataList = useMemo(()=>{
		return expenseList.map(({ type, amount, timestamp, notes, currency }) => { 
			return {
				Date: new Date(timestamp),
				amount,
				Type: type,
				Notes: notes
			}
		})
	}, [expenseList])
	if (!expenseList) return null;
	const currencyType = expenseList[0].currency;

    const exportToExcel = (data, fileName) => {
    	const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	    const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(data);
        for (let i = 0; i < data.length; i++) {
        	ws[`A${i + 2}`].z = "dd-mmm-yyyy";
        	ws[`B${i + 2}`].z = "$0.00";
        }
        ws.B1.v = `Amount (${currencyType})`;
        ws[`B${data.length + 2}`] = { t:'n', z: '$0.00', f: `SUM(B2:B${data.length + 1})`};
        ws[`A${data.length + 2}`] = { t:'s', v: 'Total:'};
        ws['!ref'] = `A1:D${data.length + 2}`;
        // Object(data[0]).keys.forEach((key, i)=>{
        // 	ws[]
        // })

        const wb = { Sheets: { 'expenses': ws }, SheetNames: ['expenses'] };
        wb.Props = {
        	Title: fileName,
        	Author: 'SpentAll Expense Tracker',
        	CreatedDate: new Date()
        }
        
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const excelData = new Blob([excelBuffer], {type: fileType});
        
        saveAs(excelData, fileName + fileExtension);
    }

    return (
        <CustomButton 
        	variant='warning' 
        	onClick={() => exportToExcel(dataList, `SpentAll Expense List for ${startDate} to ${endDate}`)}
        >
        	Export
        </CustomButton>
    )
}
export default connect(mapStateToProps)(ExportExcel);