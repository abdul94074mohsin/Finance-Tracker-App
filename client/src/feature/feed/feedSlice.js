import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import feedService from './feedService';

const initialState = {
    feeds : [],
    isFeedLoading : false,
    isFeedError : false,
    isFeedSuccess :false,
    isFeedErrorMessage: "" 
}

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(getFeed.pending, (state, action) => {
            state.isFeedError = false
            state.isFeedSuccess = false
            state.isFeedLoading = true
        })
        .addCase(getFeed.fulfilled, (state, action) => {
            state.isFeedSuccess = true
            state.feeds = action.payload
            state.isFeedError = false
            state.isFeedLoading = false
        })
        .addCase(getFeed.rejected, (state, action) => {
            state.isFeedLoading = false
            state.isFeedSuccess = false
            state.isFeedError = true
            state.isFeedErrorMessage = action.payload
        })

  }
});

export const {} = feedSlice.actions

export default feedSlice.reducer

export const getFeed = createAsyncThunk('GET/FEED', async(_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token
    try {
        return await feedService.fatchFeed(token)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

