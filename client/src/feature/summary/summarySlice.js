import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    monthlySummary : [],
    isMonthError : false,
    isMonthSuccess : false,
    isMonthErrorMessage: "",
    isMonthLoading : false
}

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {}
});

export const {} = summarySlice.actions

export default summarySlice.reducer