import mongoose from "mongoose";


const expenseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    category: {
        type: String,
        enum: ["food", "rent", "emi", "shopping", "travel", "other"],
        require : true
    },
      note: {
      type: String,
      trim: true
    },
    amount: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
},{
    timestamps : true
})

const Expense = mongoose.model("Expense", expenseSchema)

export default  Expense