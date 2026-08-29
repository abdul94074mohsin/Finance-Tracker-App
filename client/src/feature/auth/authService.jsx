import axios from "axios"



const userRegister = async(formData) => {
    const response = await axios.post("api/auth/register", formData)
    localStorage.setItem('user', JSON.stringify(response.data))
    console.log(response.data)
    return response.data
}

const userLogin = async(formData) => {
    const response = await axios.post("/api/auth/login", formData)
    localStorage.setItem('user', JSON.stringify(response.data))
    console.log(response.data)
    return response.data
}

const authService = { userRegister, userLogin }

export default authService