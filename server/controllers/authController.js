import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const registerUser = async(req, res) => {
    const { name , email, password, monthlyIncome, lifeStage} = req.body

    if( !name || ! email || !password || !monthlyIncome || !lifeStage) {
        res.status(409)
        throw new Error("Please Fill All Details !")
    }

    const existEmail = await User.findOne({email})

    if(existEmail){
        res.status(409)
        throw new Error("User Already Exist")
    }

     //Hash Password 
    let salt = bcrypt.genSaltSync(10) 
    let hashPassword = bcrypt.hashSync(password, salt)

    const user = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        monthlyIncome: monthlyIncome,
        lifeStage,
    })

    if(!user){
        res.status(409)
        throw new Error("User Not Creaed")
    }else{
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            monthlyIncome: user.monthlyIncome,
            lifeStage: user.lifeStage,
            token: generateToken(user._id)
        })
    }
}

const loginUser = async(req, res) => {
    const { email, password} = req.body

    if(!email || !password ) {
        res.status(409)
        throw new Error("please fill all details !")
    }

    const user = await User.findOne({email})
    if(user && bcrypt.compareSync(password, user.password)){
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            monthlyIncome: user.monthlyIncome,
            lifeStage: user.lifeStage,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("Invailid Credentials")
    }

}
const generateToken = (id) => {
    let token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    return token
}

const authController = { registerUser, loginUser }

export default authController