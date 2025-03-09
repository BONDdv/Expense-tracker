const ExcelJS = require("exceljs")
const Income = require("../models/Income");


exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { source, amount, date } = req.body;

        if(!source || !amount || !date) {
            return res.status(400).json({ message : "All fields are required"});
        }
        const newIncome = new Income({
            userId,
            source,
            amount,
            date: date ? new Date(date) : new Date()
        })
        await newIncome.save();
        res.status(200).json(newIncome)
    } catch (err) {
        console.error("Error addIncome ", err);
        res.status(500).json({message : "Server Error"})
    }
}

exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId}).sort({ date: -1});
        res.json(income)
    } catch (err) {
        console.error("Error getAllIncome ", err);
        res.status(500).json({ message: "Server Error"})
    }
}

exports.deleteIncome = async (req, res) => {
    
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully"})
    } catch (err) {
        console.error("Error in deleteIncome ", err);
        res.status(500).json({ message: "Server Error"})
    }
}

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1});
        
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Income");

        worksheet.columns = [
            { header: "Source", key: "source", width: 20},
            { header: "Amount", key: "amount", width: 15},
            { header: "Date", key: "date", width: 20},
        ];

        const incomeData = income.map(item => ({
            source: item.source,
            amount: item.amount,
            date: item.date.toISOString().split("T")[0]
        }));
        
        incomeData.forEach((row) => {
            worksheet.addRow(row)
        })

       
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="income_details.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();

      
    } catch (err) {
        console.error("Error generating Excel file income:", err);
        res.status(500).json({ message: "Server Error"})
    }
}

