import Loan from "../models/loanModel.js"

const addLoan = async(req, res) => {
    const {loanName, totalAmount, interestRate,  tenureMonths, emiAmount} = req.body
    if(!loanName || !totalAmount || !interestRate || !tenureMonths || !emiAmount){
        res.status(409)
        throw new Error("Please fill all details!")
    }

    const loans = await Loan.create({
        user: req.user,
        loanName,
        totalAmount,
        interestRate,
        tenureMonths,
        emiAmount
    })

    if(loans){
        res.status(201).json(loans)
    }else{
        res.status(409)
        throw new Error("Failed to add loan")
    }
}

const getLoan = async(req, res) => {
    const loans = await Loan.findOne({user: req.user})

    if(loans){
        res.status(200).json(loans)
    }else{
        res.status(404)
        throw new Error("Failed to fetch loans")
    }
}

const loanController = { addLoan, getLoan }

export default loanController