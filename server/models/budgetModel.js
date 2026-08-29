import mongoose from "mongoose";


const budgetSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    month: {
        type: Number,
        require: true
    },
    categories: [
        {
            name: String,
            limit: Number,
            spent: {
                type: Number,
                default: 0
            }
        }
    ]
},{
    timestamps: true
})

const Budget = mongoose.model("Budget", budgetSchema)

export default Budget