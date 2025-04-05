const xlsx = require('xlsx');
const Expense = require("../models/Expense");

// Add Expense Source
exports.addExpense = async ( req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        // Validation: check for missing fields
        if(!category || !amount || !date){
            return res.status(400).json({ message: "All fields are required"});
        }

        const newExpense = new Expense({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
}

// Get All Expense Source
exports.getAllExpense = async ( req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }.sort({ date: -1}));
        res.json(Expense);
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
}

// Delete Expense Source
exports.deleteExpense = async ( req, res) => {
    const userId = req.user.id;
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// Download Excel 
exports.downloadExpenseExcel = async ( req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1});
        // Prepare data for excel

        const data = expense.map((item) =>({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'Expense_details.xlsx');
        res.download('Expense_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
}