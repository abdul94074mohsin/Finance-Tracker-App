import axios from "axios"


const fatchBudget = async(token) => {
    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get('api/budget/status', options)
    return response.data
}

const budgetService = { fatchBudget } 

export default budgetService