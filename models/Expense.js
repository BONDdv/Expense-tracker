const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    source: {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, required: true}
})

module.exports = mongoose.model("Expense", ExpenseSchema)