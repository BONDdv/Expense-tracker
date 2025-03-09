const ExcelJS = require("exceljs");
const Expense = require("../models/Expense");

exports.addExpense = async(req,res) => {
    const userId = req.user.id;
    try {
        const {source, amount, date} = req.body;
        if(!source || !amount || !date) {
            return res.status(400).json({message: "All fields are required"});
        }
        const newExpense = new Expense({
            userId,
            source,
            amount,
            date: date? new Date(date) : new Date()
        });
        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (err) {
        console.log("Error in addExpense", err);
        res.status(500).json({ message: "Server error"})
    }
}

exports.getAllExpense = async (req,res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
    } catch (err) {
        console.log("Error in getAllExpense");
        res.status(500).json({ message : "Server error"})
    }
};

exports.deleteExpense = async (req,res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message : "Deleted expense"});
    } catch (err) {
        console.log("Error in deleteExpense");
        res.status(500).json({ message : "Server error"})
    }
};


exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1});
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Expense");

        worksheet.columns = [
            { header: "Source", key: "source", width: 20},
            { header: "Amount", key: "amount", width: 15},
            { header: "Date", key: "date", width: 20},
        ];

        const expenseData = expense.map(item => ({
            source: item.source,
            amount: item.amount,
            date: item.date.toISOString().split("T")[0]
        }));
        console.log(expenseData)
        expenseData.forEach((row) => {
            worksheet.addRow(row)
        })

       
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="expense_details.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();

      
    } catch (err) {
        console.error("Error generating Excel file expense:", err);
        res.status(500).json({ message: "Server Error"})
    }
}

