import axios from "axios"
import { toast } from "react-toastify"


const fatchFeed = async(token) => {
    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
  try {
      const response = await axios.get("api/feed/personal", options)
    console.log("res",response.data)
    return response.data
  } catch (error) {
    toast.error(error.response.data.message)
  }
}

const feedService = { fatchFeed }

export default feedService