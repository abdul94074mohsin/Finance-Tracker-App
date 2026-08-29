// import axios from "axios"


// const fatchGoal = async(token) => {
//     let options = {
//         headers : {
//             authorization : `Bearer ${token}`
//         }
//     }
//     const response = await axios.get('api/goal/all', options)
//     console.log(response.data)
//     return response.data
// }

// const goalService = { fatchGoal }

// export default goalService

import axios from "axios";

// GET ALL GOALS
const fatchGoal = async (token) => {
  const response = await axios.get("api/goal/all", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return response.data; // { goals: [...] }
};

// UPDATE GOAL AMOUNT
const updateGoal = async ({ id, amount, token }) => {
  const response = await axios.put(
    `api/goal/save/${id}`,
    { amount },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // { message: "Goal updated", goal: {...} }
};

const goalAdd = async(token, formData) => {
  let options = {
    headers : {
      authorization : `Bearer ${token}`
    }
  }
  const response = await axios.post('api/goal/add', formData, options)
  console.log(response.data)
  return response.data
}

const goalService = { fatchGoal, updateGoal, goalAdd };

export default goalService;
