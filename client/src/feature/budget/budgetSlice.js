import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import budgetService from './budgetSevice';

const initialState = {
    budget: {
        _id: null,
        user: null,
        year: null,
        month: null,
        categories: [],     // ← ARRAY because categories is an array
        createdAt: null,
        updatedAt: null,
    },

    isBudgetLoading: false,
    isBudgetSuccess: false,
    isBudgetError: false,
    budgetMessage: "",
}

const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBudget.pending, (state, action) => {
                state.isBudgetError = false
                state.isBudgetLoading = true
                state.isBudgetSuccess = false
            })
            .addCase(getBudget.fulfilled, (state, action) => {
                state.isBudgetSuccess = true
                state.budget = action.payload
                state.isBudgetError = false
                state.isBudgetLoading = false
            })
            .addCase(getBudget.rejected, (state, action) => {
                state.isBudgetLoading = false
                state.isBudgetSuccess = false
                state.isBudgetError = true
                state.budgetMessage = action.payload
            })
    }
});

export const { } = budgetSlice.actions

export default budgetSlice.reducer

export const getBudget = createAsyncThunk('GET/BUDGET', async(_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token
    try {
        return await budgetService.fatchBudget(token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})