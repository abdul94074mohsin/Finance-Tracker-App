import Income from "../models/incomeModel.js"


const addIncome = async(req, res) => {
    const { source, amount, date} = req.body

    if(!amount) {
        res.status(409)
        throw new Error("Amout is required !")
    }

    const incomeDate = date ? new Date(date) : new Date();
        incomeDate.setHours(0, 0, 0, 0);

    const newIncome = await Income.create({
        user: req.user,
        source,
        amount,
        date : incomeDate,
    })

    if(newIncome){
        res.status(201).json(newIncome)
    }else{
        res.status(409)
        throw new Error("Failed to add income")
    }
}

const getIncome = async(req,res) => {
    try {
        const incomes = await Income.find({user : req.user}).sort({date: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(404)
        throw new Error("Failed to fetch incomes")
    }
}

const incomeController = {addIncome, getIncome}

export default incomeController