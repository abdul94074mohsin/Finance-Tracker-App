import Budget from "../models/budgetModel.js"
import Expense from "../models/expenseModel.js"


const addBudget = async(req, res) => {
    const {year, month, categories} = req.body

    if(!year || !month || !categories){
        res.status(409)
        throw new Error("Please fill all Details!")
    }

    const budgets = await Budget.create({
        user: req.user,
        year,
        month,
        categories
    })

    if(budgets){
        res.status(200).json(budgets)
    }else{
        res.status(409)
        throw new Error("Failed to set budget")
    }

}

const checkBudgetStatus = async (req, res) => {
  
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    console.log(month)
    console.log(year)

    const budget = await Budget.findOne({ user: req.user, month, year });
    if (!budget) {
       res.status(404)
       throw new Error("no budget target set")
    }

    // calculate expenses for each category
    const expenses = await Expense.find({ user: req.user });

    budget.categories.forEach((cat) => {
      const spent = expenses
        .filter((e) => e.category === cat.name)
        .reduce((sum, e) => sum + e.amount, 0);

      cat.spent = spent;
    });

    await budget.save();
    if(budget){
    res.status(200).json({
      budget,
    });
  } else {
    res.status(500)
    throw new Error("Budget check failed")
  }
};


const budgetController = { addBudget, checkBudgetStatus }

export default budgetController