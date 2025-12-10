import Expense from "../models/expenseModel.js";

const createExpense = async (req, res) => {
    try {
        const ExpenseDetails = new Expense(req.body);
        await ExpenseDetails.save();
        res.status(201).json({
            success: true,
            message: "Expense created successfully",
            data: ExpenseDetails
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getExpense = async (req, res) => {
    try {
        const ExpenseDetails = await Expense.find();
        res.status(200).json({
            success: true,
            data: ExpenseDetails
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedExpenseDetails = await Expense.findByIdAndUpdate(id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedExpenseDetails) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: updatedExpenseDetails
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpenseDetails = await Expense.findByIdAndDelete(id);
        if (!deletedExpenseDetails) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({success:true, message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getExpenseByHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const ExpenseDetails = await Expense.find({ hotelId });
        res.status(200).json({
            success: true,
            data: ExpenseDetails
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createExpense,
    getExpense,
    updateExpense,
    deleteExpense,
    getExpenseByHotel
};