import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import expenseServise from './expenseServise';

const initialState = {
    totalExpense : [],
    expense : {},
    isExpenseError : false,
    isExpenseErrorMessage: "",
    isExpenseSuccess : false,
    isExpenseLoading: false
}

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {},
  extraReducers : (builder) => {
    builder
        .addCase(getExpense.pending,(state, action) => {
            state.isExpenseError = false
            state.isExpenseSuccess = false
            state.isExpenseLoading = true
        })
        .addCase(getExpense.fulfilled, (state, action) => {
            state.isExpenseError = false
            state.isExpenseLoading = false
            state.isExpenseSuccess = true
            state.totalExpense = action.payload
        })
        .addCase(getExpense.rejected, (state, action) => {
            state.isExpenseError = true
            state.isExpenseErrorMessage = action.payload
            state.isExpenseLoading = false
            state.isExpenseSuccess = false
        })
        .addCase(addExpense.pending, (state, action) => {
            state.isExpenseError = false
            state.isExpenseLoading = true
            state.isExpenseSuccess = false
        })
        .addCase(addExpense.fulfilled, (state, action) => {
            state.isExpenseError = false
            state.isExpenseLoading = false
            state.isExpenseSuccess = true
            state.totalExpense = [action.payload, ...state.totalExpense]
        })
        .addCase(addExpense.rejected, (state, action) => {
            state.isExpenseError = true
            state.isExpenseErrorMessage = action.payload
            state.isExpenseLoading = false
            state.isExpenseSuccess = false
        })
  }
});

export const {} = expenseSlice.actions

export default expenseSlice.reducer

export const getExpense = createAsyncThunk('GET/EXPENSE', async(_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token
    try {
        return await expenseServise.expenseGet(token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const addExpense = createAsyncThunk('ADD/EXPENSE', async(formData, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token
    try {
        return await expenseServise.expenseAdd(token, formData)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})