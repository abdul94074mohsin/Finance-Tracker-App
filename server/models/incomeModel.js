import mongoose from "mongoose";


const incomeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    source: {
      type: String,
      enum: ["salary", "freelance", "business", "other"],
      default: "salary"
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
    timestamps: true
})

const Income = mongoose.model("Income", incomeSchema)

export default Income