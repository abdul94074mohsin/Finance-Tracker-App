import express from "express";
import connectDb from "./config/dbConfig.js";
import dotenv from "dotenv";

// local imports
import errorHandler from "./middleware/errorHandler.js";
import authRoute from "./routes/authRoute.js";
import incomeRoute from "./routes/incomeRoute.js";
import expenseRoute from "./routes/expenseRoute.js";
import summaryRoute from "./routes/summaryRoute.js";
import loanRoute from "./routes/loanRoute.js";
import aiRoute from "./routes/aiRoute.js";
import goalRoute from "./routes/goalRoute.js"
import budgetRoute from "./routes/budgetRouter.js"
import feedRoute from "./routes/feedRoute.js"
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

connectDb();

// ✅ BODY PARSERS (VERY IMPORTANT – FIRST)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Finance Tracker API 1.0 😉",
  });
});

// ✅ ROUTES
app.use("/api/auth", authRoute);
app.use("/api/income", incomeRoute);
app.use("/api/expense", expenseRoute);
app.use("/api/summary", summaryRoute);
app.use("/api/loan", loanRoute);
app.use("/api/ai", aiRoute);
app.use("/api/goal", goalRoute)
app.use("/api/budget", budgetRoute)
app.use("/api/feed", feedRoute)

// ✅ ERROR HANDLER (ALWAYS LAST)
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`SERVER IS RUNNING AT ${PORT}`)
);
