import express from "express";
import {createExpense, getExpense, updateExpense, deleteExpense, getExpenseByHotel} from "../controllers/expenseController.js";
const expenseRouter = express.Router();

expenseRouter.post("/create-expense", createExpense);
expenseRouter.get("/view-expense", getExpense);
expenseRouter.put("/edit-expense/:id", updateExpense);
expenseRouter.delete("/delete-expense/:id", deleteExpense);
expenseRouter.get("/get-expense-by-hotel/:hotelId", getExpenseByHotel);

export default expenseRouter;