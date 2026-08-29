import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService';

const userExist = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user : userExist || null,
    isLoading : false,
    isSuccess: false,
    isError : false,
    isErrorMessage: ""
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(registerUser.pending, (state, action) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.isErrorMessage = action.payload
        })

        //for login 
        .addCase(loginUser.pending, (state, action) => {
            state.isError = false
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.isErrorMessage = action.payload
        })

        .addCase(LogOut.fulfilled,(state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.user = null
        })
  }
});

export const {} = authSlice.actions

export default authSlice.reducer

export const registerUser = createAsyncThunk("REGISTER/USER", async(formData, thunkAPI) => {
    try {
        return await authService.userRegister(formData)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const loginUser = createAsyncThunk("LOGIN/USER", async(formData, thunkAPI) => {
    try {
        return await authService.userLogin(formData)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const LogOut = createAsyncThunk('LOGOUT/USER', async() => {
    localStorage.removeItem('user')
})