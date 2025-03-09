const ExcelJS = require("exceljs");
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const mongoose = require("mongoose");


const calculateTotals = async (userId,dateFilter = {}) => {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const totalIncome = await Income.aggregate([
        { $match: { userId: userObjectId, ...dateFilter}},
        { $group: {_id: null, totalIncome: {$sum: "$amount"}}}
    ]);
    const totalExpense = await Expense.aggregate([
        { $match: {userId: userObjectId, ...dateFilter}},
        { $group: {_id: null, totalExpense: {$sum: "$amount"}}}
    ]);

    const incomeAmount = totalIncome[0]?.totalIncome || 0;
    const expenseAmount = totalExpense[0]?.totalExpense || 0;
    const balance = incomeAmount - expenseAmount;

    return { incomeAmount, expenseAmount, balance };
}

const parseDate = (dateString) => {
    return dateString ? new Date(dateString) : null;
}

const buildDateFilter = (startDate, endDate) => {
    const filter = {};
    if (startDate && endDate) {
        
        filter.date = { 
            $gte: new Date(startDate).setHours(0, 0, 0, 0), 
            $lte: new Date(endDate).setHours(23, 59, 59, 999) 
        };
    } else if (startDate) {
        filter.date = { 
            $gte: new Date(startDate).setHours(0, 0, 0, 0) 
        };
    } else if (endDate) {
        filter.date = { 
            $lte: new Date(endDate).setHours(23, 59, 59, 999) 
        };
    }
    return filter;
}


exports.getSummary = async (req, res) => {

    const userId = req.user.id;
    let {startDate, endDate} = req.query;
    
    try {
        startDate = parseDate(startDate);
        endDate = parseDate(endDate);
        const dateFilter = buildDateFilter(startDate, endDate);

        const { incomeAmount, expenseAmount, balance} = await calculateTotals(userId, dateFilter);

        res.json({
            totalIncome: incomeAmount,
            totalExpense: expenseAmount,
            balance,
            startDate: startDate ? startDate.toISOString().split("T")[0] : "N/A",
            endDate: endDate ? endDate.toISOString().split("T")[0] : "N/A"
        });
    } catch (err) {
        console.log("Error in getSummary:", err);
        res.status(500).json({ message: "Server Error" });
    }
}

exports.search = async (req, res) => {
    const userId = req.user.id;
    let {startDate, endDate, type} = req.query;

    try {
       startDate = parseDate(startDate);
       endDate = parseDate(endDate);
       const dateFilter = buildDateFilter(startDate, endDate);

       let filter = {userId, ...dateFilter};

       if(type) {
        if (type === 'income') {
            const incomeRecords = await Income.find(filter);
            res.json(incomeRecords);
        } else if (type === 'expense') {
            const expenseRecords = await Expense.find(filter);
            res.json(expenseRecords);
        } else {
            return res.status(400).json({ message: "Invalid type parameter. Use 'income' or 'expense'."})
        }
       } else {
        const incomeRecords = await Income.find(filter);
        const expenseRecords = await Expense.find(filter);
        res.json({incomeRecords,expenseRecords});
       }


    } catch (err) {
        console.log("Error in search data:", err);
        res.status(500).json({ message: "Server Error" });
    }
}

exports.downloadSummaryExcel = async(req,res) => {

    const userId = req.user.id;
    let {startDate, endDate} = req.query;

    try {

        startDate = parseDate(startDate);
        endDate = parseDate(endDate);
        const dateFilter = buildDateFilter(startDate, endDate);
 
        const { incomeAmount, expenseAmount, balance} = await calculateTotals(userId, dateFilter);
        
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Summary");

        worksheet.columns = [
            { header: "Total Income", key: "incomeAmount", width: 20},
            { header: "Total Expense", key: "expenseAmount", width: 15},
            { header: "Balance", key: "balance", width: 15},
            { header: "Start Date", key: "startDate", width: 15},
            { header: "End Date", key: "endDate", width: 15},
        ];

        worksheet.addRow({
            incomeAmount,
            expenseAmount,
            balance,
            startDate: startDate ? startDate.toISOString().split("T")[0] : "N/A",
            endDate: endDate ? endDate.toISOString().split("T")[0] : "N/A"
        });

       
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="summary_details.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (err) {
        console.log("Error in downloadSummary:", err);
        res.status(500).json({ message: "Server Error" });
    }
}