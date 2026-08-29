// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import goalService from './goalService';

// const initialState = {
//     goals: [],         // ← Array because API returns array
//     isGoalsLoading: false,
//     isGoalsSuccess: false,
//     isGoalsError: false,
//     goalsMessage: "",
// };


// const goalSlice = createSlice({
//     name: "goal",
//     initialState,
//     reducers: {},
//     extraReducers : (builder) => {
//         builder
//             .addCase(getGoal.pending, (state, action) => {
//                 state.isGoalsError = false
//                 state.isGoalsLoading = true
//                 state.isGoalsSuccess = false
//             })
//             .addCase(getGoal.fulfilled, (state, action) => {
//                 state.isGoalsSuccess = true
//                 state.goals = action.payload.goals
//                 state.isGoalsError = false
//                 state.isGoalsLoading = false
//             })
//             .addCase(getGoal.rejected, (state, action) => {
//                 state.isGoalsLoading = false
//                 state.isGoalsSuccess = false
//                 state.isGoalsError = true
//                 state.goalsMessage = action.payload
//             })

//     }
// });

// export const { } = goalSlice.actions

// export default goalSlice.reducer

// export const getGoal = createAsyncThunk('GET/GOAL', async(_, thunkAPI) => {
//     let token = thunkAPI.getState().auth.user.token
//     try {
//         return await goalService.fatchGoal(token)
//     } catch (error) {
//         let message = error.response.data.error
//         return thunkAPI.rejectWithValue(message)
//     }
// })


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  isGoalsLoading: false,
  isGoalsSuccess: false,
  isGoalsError: false,
  goalsMessage: "",
};

// ================= GET GOALS ===================
export const getGoal = createAsyncThunk(
  "GET/GOAL",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await goalService.fatchGoal(token);
    } catch (error) {
      let message = error.response?.data?.error || "Unable to fetch goals";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ================= UPDATE GOAL (ADD AMOUNT) ===================
export const updateGoal = createAsyncThunk(
  "UPDATE/GOAL",
  async ({ id, amount }, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;

    try {
      return await goalService.updateGoal({ id, amount, token });
    } catch (error) {
      let message = error.response?.data?.error || "Unable to update";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addGoals = createAsyncThunk('ADD/GOAL', async(formData, thunkAPI) => {
  let token = thunkAPI.getState().auth.user.token
  try {
    return await goalService.goalAdd(token, formData)
  } catch (error) {
    let message = error.response.data.error
    return thunkAPI.rejectWithValue(message)
  }
})

// ================= SLICE ===================
const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ===== GET GOALS =====
      .addCase(getGoal.pending, (state) => {
        state.isGoalsLoading = true;
        state.isGoalsError = false;
        state.isGoalsSuccess = false;
      })
      .addCase(getGoal.fulfilled, (state, action) => {
        state.isGoalsLoading = false;
        state.isGoalsSuccess = true;
        state.goals = action.payload.goals; // array from backend
      })
      .addCase(getGoal.rejected, (state, action) => {
        state.isGoalsLoading = false;
        state.isGoalsError = true;
        state.goalsMessage = action.payload;
      })

      // ===== UPDATE GOAL =====
      .addCase(updateGoal.pending, (state) => {
        state.isGoalsLoading = true;
        state.isGoalsError = false;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.isGoalsLoading = false;
        state.isGoalsSuccess = true;

        const updatedGoal = action.payload.goal;

        // Replace updated goal inside array
        state.goals = state.goals.map((goal) =>
          goal._id === updatedGoal._id ? updatedGoal : goal
        );
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isGoalsLoading = false;
        state.isGoalsError = true;
        state.goalsMessage = action.payload;
      })

      .addCase(addGoals.pending, (state, action) => {
        state.isGoalsError = false
        state.isGoalsLoading = true
        state.isGoalsSuccess = false
      })
      .addCase(addGoals.fulfilled, (state, action) => {
        state.isGoalsSuccess = false
        state.goals = [action.payload.goals, ...state.goals]
        state.isGoalsError = false
        state.isGoalsLoading = false
      })
      .addCase(addGoals.rejected, (state, action) => {
        state.isGoalsLoading = false
        state.isGoalsSuccess = false
        state.isGoalsError = true
        state.goalsMessage = action.payload
      })
  },
});

export default goalSlice.reducer;

