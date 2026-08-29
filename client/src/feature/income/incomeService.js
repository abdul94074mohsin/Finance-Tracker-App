import axios from "axios"

const incomeGet = async(token) => {
    let options = {
        headers: {
            authorization : `Bearer ${token}`
        }
    }
  
    const response = await axios.get('api/income/all', options)
    return response.data
}

const incomeAdd = async(token, formData) => {
    let options = {
        headers : {
            authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post('api/income/add', formData, options)
    console.log(response)

}

const incomeService = { incomeGet, incomeAdd } 

export default incomeService

