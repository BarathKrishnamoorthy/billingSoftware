import mongoose from "mongoose";
const expenseSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    item:{
      type: String,
    },
    amount: {
      type: String,
    },
    
  },
  {
    timestamps: true,
  }
);
const Expense = mongoose.model("expense", expenseSchema);
export default Expense;