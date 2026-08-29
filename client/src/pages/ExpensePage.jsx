import { Plus, Wallet, TrendingDown, BarChart3 } from 'lucide-react';
import ExpenseSummaryCard from '../components/expense/ExpenseSummaryCard';
import ExpenseCard from '../components/expense/ExpenseCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getExpense } from '../feature/expense/expenseSlice';
import { toast } from 'react-toastify';
import LoadingScreen from '../components/LoadingScreen';

export default function ExpensePage() {

  // 🟢 Correct selector
  const { totalExpense, isExpenseError, isExpenseErrorMessage, isExpenseLoading } = useSelector(
    state => state.expense
  );

  

  const dispatch = useDispatch();

  // 🟢 TOTAL EXPENSE
  const totalExpenseAmount = totalExpense.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  // 🟢 HIGHEST CATEGORY
  const highestCategory = totalExpense.length
    ? totalExpense.reduce((prev, curr) =>
        curr.amount > prev.amount ? curr : prev
      ).category
    : "N/A";

  // 🟢 MONTHLY AVERAGE
  const averageMonthly = Math.round(totalExpenseAmount / 12);

  useEffect(() => {
    dispatch(getExpense());

    if (isExpenseError && isExpenseErrorMessage) {
      toast.error(isExpenseErrorMessage, { position: "top-center" });
    }
  }, [isExpenseError, isExpenseErrorMessage]);

  if (isExpenseLoading) {
    return <LoadingScreen loadingMessage={'Fetching data...'} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Your Expenses</h1>
            <p className="text-gray-400">Track where your money is going</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-red-500/50 hover:scale-105 transition-all duration-300">
            <Plus className="w-5 h-5" />
            Add Expense
          </button>
        </div>

        {/* 🟢 SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ExpenseSummaryCard
            title="Total Expense"
            value={`₹${totalExpenseAmount.toLocaleString()}`}
            icon={TrendingDown}
            gradient="bg-gradient-to-br from-red-400 to-red-600"
          />

          <ExpenseSummaryCard
            title="Highest Category"
            value={highestCategory}
            icon={BarChart3}
            gradient="bg-gradient-to-br from-pink-400 to-pink-600"
          />

          <ExpenseSummaryCard
            title="Monthly Average"
            value={`₹${averageMonthly.toLocaleString()}`}
            icon={Wallet}
            gradient="bg-gradient-to-br from-orange-400 to-orange-600"
          />
        </div>

        {/* 🟢 RECENT EXPENSES */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Expenses</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {totalExpense.map((expense) => (
            <ExpenseCard key={expense._id} expense={expense} />
          ))}
        </div>

      </div>
    </div>
  );
}
