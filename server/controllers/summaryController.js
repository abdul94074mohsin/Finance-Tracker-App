import Expense from "../models/expenseModel.js";
import Income from "../models/incomeModel.js";


 const getMonthlySummary = async (req, res) => {
  try {
    const userId = req.user;
    
    const { month, year } = req.query;

    // Month: 1–12  | Year: 2024 etc.
    const selectedMonth = parseInt(month);
    const selectedYear = parseInt(year);

    if (!selectedMonth || !selectedYear) {
      return res.status(400).json({ message: "Month and Year are required" });
    }

    // Month start & end
    const startDate = new Date(selectedYear, selectedMonth - 1, 1);
    const endDate = new Date(selectedYear, selectedMonth, 0);

    // Income for month
    const incomes = await Income.find({
      user: userId,
      date: { $gte: startDate, $lte: endDate },
    });
    

    // Expense for month
    const expenses = await Expense.find({
      user: userId,
      date: { $gte: startDate, $lte: endDate },
    });

    const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
    const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

    const savings = totalIncome - totalExpense;
    const savingPercent = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;

    // 🔥 Mini CA Alerts
    const alerts = [];

    if (totalExpense > totalIncome) {
      alerts.push("Bhai kharcha income se zyada ho gaya hai, thoda control karo 🙂");
    }

    if (savingPercent < 10 && totalIncome > 0) {
      alerts.push("Savings 10% se kam hai. Roz ₹20–50 side me rakhna start karo.");
    }

    if (totalExpense === 0) {
      alerts.push("Iss month koi expense add nahi hua. Sahi tracking ke liye expenses add karo.");
    }

    if (savings > 0 && savingPercent > 20) {
      alerts.push("Bahut badiya! Aapki savings healthy hai. SIP start karne ka perfect time hai.");
    }

    return res.status(200).json({
      message: "Monthly summary fetched",
      summary: {
        totalIncome,
        totalExpense,
        savings,
        savingPercent: savingPercent.toFixed(2),
        alerts,
      },
    });

  } catch (error) {
    res.status(500)
    throw new Error("Failed to get summary")
  }
};


const summaryController = { getMonthlySummary }

export default summaryController