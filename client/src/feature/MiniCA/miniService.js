import axios from "axios"

const talkToAi = async (token, message) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "api/ai/chat",
    { message },
    options
  );

  // backend returns: { message: "...", response: "AI text" }
  const aiResponse = response.data?.response;

  console.log("AI RESPONSE:", aiResponse);

  return aiResponse;
};



// const talkToAi = async(token, message) => {
//     let options = {
//         headers : {
//             authorization: `Bearer ${token}`
//         }
//     }

//     const response = await axios.get('api/ai/response', message, options)
//     console.log(response.data)
//     return response.data
// } 

const miniService = { talkToAi } 

export default miniService