import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name : {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    monthlyIncome: {
        type: Number,
        default: 0
    },
    lifeStage: {
        type: String,
        enum: ["student", "single", "married", "child"],
        default: "single"
    }

},{
    timestamps: true
})

const User = mongoose.model("User", userSchema)

export default User