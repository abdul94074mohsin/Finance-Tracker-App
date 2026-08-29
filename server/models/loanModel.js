import mongoose from "mongoose";


const loanSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    loanName: {
        type: String,
        require: true
    },
    totalAmount: {
        type: Number,
        require: true
    },
    interestRate: {
        type: Number,
        require: true
    },
    emiAmount: {
      type: Number,
      required: true
    },
     tenureMonths: {
      type: Number,
      required: true
    },
    startDate: {
      type: Date,
      default: Date.now
    }
},{
    timestamps:  true
})

const Loan = mongoose.model("Loan", loanSchema)

export default Loan