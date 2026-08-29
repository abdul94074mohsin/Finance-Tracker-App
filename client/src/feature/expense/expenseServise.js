import axios from "axios"


const expenseGet = async(token) => {
    let options = {
        headers : {
            authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get('api/expense/all', options)
    return response.data
}

const expenseAdd = async(token, formData) => {
    let options = {
        headers: {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post('api/expense/add', formData, options)
    console.log(response.data)
    return response.data
}


const expenseServise = { expenseGet, expenseAdd}

export default expenseServise