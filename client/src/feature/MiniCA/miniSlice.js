import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import miniService from './miniService';

const initialState = {
  response: "",
  isAILoading: false,
  isAIError: false,
  isAISuccess: false,
  AIErrorMessage: "",
}

export const getResponse = createAsyncThunk(
  "miniCA/getResponse",
  async (message, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await miniService.talkToAi(token, message);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

const miniSlice = createSlice({
  name: "miniCA",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getResponse.pending, (state) => {
        state.isAILoading = true;
        state.isAISuccess = false;
        state.isAIError = false;
      })
      .addCase(getResponse.fulfilled, (state, action) => {
        state.isAILoading = false;
        state.isAISuccess = true;
        state.response = action.payload; // AI ka response text
      })
      .addCase(getResponse.rejected, (state, action) => {
        state.isAILoading = false;
        state.isAIError = true;
        state.AIErrorMessage = action.payload;
      })
  }
});

export default miniSlice.reducer;
