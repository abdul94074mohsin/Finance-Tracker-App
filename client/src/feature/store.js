import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice"
import income from "./income/incomSlice"
import expense from "./expense/expenseSlice"
import summary from "./summary/summarySlice"
import miniCA from "./MiniCA/miniSlice"
import feed from "./feed/feedSlice"
import budget from "./budget/budgetSlice"
import goal from "./goal/goalSlice"


const store = configureStore({
    reducer : { auth, income, expense, summary, miniCA, feed, budget, goal }
})

export default store