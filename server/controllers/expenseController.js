import Expense from "../models/expenseModel.js"


const addExpense = async(req, res) => {
    const {category, note, amount, date} = req.body
    if(!category || !amount){
        res.status(401)
        throw new Error("Category & Amount are require")
    }
    
    const newExpense = await Expense.create({
        user: req.user,
        category,
        note,
        amount,
        date : date|| new Date() 
    })

    if(newExpense){
        res.status(201).json(newExpense)
    }else{
        res.status(409)
        throw new Error("Failed to add expense")
    }
}

const getExpense = async(req, res) => {
    const expenses = await Expense.find({user : req.user}).sort({ date: -1 });

    if(expenses){
        res.status(200).json(expenses)
    }else{
        res.status(404)
        throw new Error("Failed to get expenses")
    }
}

export const getCategorySummary = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: "Month and Year required" });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // Get all expenses for selected month
    const expenses = await Expense.find({
      user: req.user,
      date: { $gte: startDate, $lte: endDate }
    });

    // Category Summary Logic
    const summary = {};

    expenses.forEach((exp) => {
      if (!summary[exp.category]) {
        summary[exp.category] = 0;
      }
      summary[exp.category] += exp.amount;
    });

    res.status(200).json({
      message: "Category-wise summary fetched",
      summary
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to get summary",
      error: error.message
    });
  }
};


const expenseController = { addExpense, getExpense, getCategorySummary } 

export default expenseController