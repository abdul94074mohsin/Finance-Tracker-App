import AIResponse from "../models/AIresponseModel.js";
import Expense from "../models/expenseModel.js";
import Goal from "../models/goalModel.js";
import Income from "../models/incomeModel.js";
import Loan from "../models/loanModel.js";
import askGemini from "../utils/geminiAI.js"

 const miniCAChatbot = async (req, res) => {
  try {
    const userId = req.user;
    const { message } = req.body;

    if (!message)
      return res.status(400).json({ message: "User message required" });

    // Fetch data
    const incomes = await Income.find({ user: userId });
    const expenses = await Expense.find({ user: userId });
    const loans = await Loan.find({ user: userId });
    const goals = await Goal.find({ user: userId });

    // Income / Expense / Savings
    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
    const savings = totalIncome - totalExpense;

    // Category summary
    const categorySummary = {};
    expenses.forEach((e) => {
      categorySummary[e.category] =
        (categorySummary[e.category] || 0) + e.amount;
    });

    // ---------- GOAL ANALYSIS ----------
    const goalDetails = goals.map((g) => {
      const leftAmount = g.targetAmount - g.savedAmount;
      const monthlyRequired = Math.ceil(leftAmount / g.deadlineMonths);

      const isAchievable = monthlyRequired <= savings;

      return {
        title: g.title,
        targetAmount: g.targetAmount,
        savedAmount: g.savedAmount,
        deadlineMonths: g.deadlineMonths,
        leftAmount,
        monthlyRequired,
        achievableWithCurrentSavings: isAchievable,
      };
    });

    // ---------- AI PROMPT ----------
    const aiPrompt = `
You are "Mini CA" — a friendly Indian finance mentor. Speak in Hinglish, friendly tone.

User says: "${message}"

### USER FINANCIAL DATA:
- Total Income: ₹${totalIncome}
- Total Expense: ₹${totalExpense}
- Savings (per month): ₹${savings}

### EXPENSE BREAKDOWN:
${JSON.stringify(categorySummary, null, 2)}

### LOANS:
${loans.length > 0 ? JSON.stringify(loans, null, 2) : "User has no loans"}

### USER GOALS (IMPORTANT):
${JSON.stringify(goalDetails, null, 2)}

### YOUR TASK:
- Understand user's message + financial situation + their goals.
- Check whether goals are achievable based on monthly savings.
- Suggest if the user should increase savings or extend deadline.
- If goal is easily achievable → motivate the user.
- If not achievable → tell how many months extra they need.
- If goal requires more money than the user saves → suggest small saving tricks.
- Keep your answer short (6–8 lines), friendly, no complex finance terms.
- Do NOT overpromise returns or guaranteed profit.

Reply in conversational Hinglish.
    `;

    const aiResponse = await askGemini(aiPrompt);

    res.status(200).json({
      message: "AI Response Generated",
      response: aiResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Mini CA AI failed",
      error: error.message,
    });
  }
};


const smartGoalAdvice = async (req, res) => {
  try {
    const { message } = req.body;

    // get user goals
    const goals = await Goal.find({ user: req.user });

    if (goals.length === 0) {
      return res.status(200).json({
        response: "Aapne koi goal add nahi kiya hai. Pehle goal create karo fir mai advice dunga 🙂"
      });
    }

    // Convert goals into AI-readable format
    const goalsInfo = goals.map((g) => {
      const monthlySaving = Math.ceil((g.targetAmount - g.savedAmount) / g.deadlineMonths);
      return `
Goal: ${g.title}
Target: ₹${g.targetAmount}
Saved: ₹${g.savedAmount}
Deadline: ${g.deadlineMonths} months
Required Monthly Saving: ₹${monthlySaving}
Status: ${g.status}
`;
    }).join("\n");

    // AI Prompt
    const aiPrompt = `
You are Mini-CA, an Indian financial advisor.
User asked: "${message}"

Here are the user's goals:

${goalsInfo}

Give smart, friendly, practical advice.
Simplify language like a big brother.
Suggest improvements if needed.
`;

    const response = await askGemini(aiPrompt);

    // res.status(200).json({
    //   message: "Goal-based AI advice generated",
    //   response: aiResponse
    // });

    const aiResponse = await AIResponse.create({
        message: "Goal-based AI advice generated",
      response: response
    })

    if(aiResponse) {
      res.status(200).json({
      message: "Goal-based AI advice generated",
      response: aiResponse
    });
    }
  } catch (error) {
    res.status(500).json({
      message: "AI goal advice failed",
      error: error.message
    });
  }
};

const getResponse = async(req, res) => {

   const { message } = req.body;
  const AiResponse = await AIResponse.find({message})

  if(AiResponse){
    res.status(200).json({
      response:AiResponse
    })
  }else{
    res.status(409)
    throw new Error("something went wrong!")
  }
}



const aiController = {getResponse, miniCAChatbot, smartGoalAdvice }

export default aiController
