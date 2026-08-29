import Goal from "../models/goalModel.js"


const addGoal = async (req, res) => {
    const { title, targetAmount, deadlineMonths } = req.body

    if (!title || !targetAmount || !deadlineMonths) {
        res.status(401)
        throw new Error("Please Fill all details !")
    }

    const goals = await Goal.create({
        user: req.user,
        title,
        targetAmount,
        deadlineMonths
    })

    const monthlySaving = Math.ceil(targetAmount / deadlineMonths);
    

    if (goals) {
        res.status(200).json({
            goals,
            monthlySaving
        })
    } else {
            res.status(409)
            throw new Error("Failed to add goal")
    }

}
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user });


    const goalsWithProgress = goals.map((goal) => {

      // subtract savedAmount from targetAmount
      const remainingAmount = goal.targetAmount - goal.savedAmount;

      // Calculate progress
      const progressPercent =
        (goal.savedAmount / goal.targetAmount) * 100;

      return {
        ...goal.toObject(),
        remainingAmount, 
        progressPercent: Math.min(progressPercent.toFixed(2), 100),
      };
    });

    res.status(200).json({
      goals: goalsWithProgress,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to get goals");
  }
};


const updateGoalSaving = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const goal = await Goal.findOne({ _id: id, user: req.user });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    
    goal.savedAmount += parseInt(amount);

    if (goal.savedAmount >= goal.targetAmount) {
      goal.status = "completed";
    }

    await goal.save();

    res.status(200).json({
      message: "Goal updated",
      goal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update goal",
      error: error.message,
    });
  }
};

const goalController = { addGoal, getGoals, updateGoalSaving}

export default goalController