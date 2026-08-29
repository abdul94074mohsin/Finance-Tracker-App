import mongoose from "mongoose";


const AIResponseSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        require: true
    },
    response:{
        type:String,

    },
    message:{
        type:String,
        require:true,
    }

},{
    timestamps: true
})

const AIResponse = mongoose.model("AIResponse", AIResponseSchema)

export default AIResponse