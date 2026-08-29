import { Plus, Wallet, TrendingUp } from 'lucide-react';
import SummaryCard from '../components/income/summaryCard';
import IncomeCard from '../components/income/incomeCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getIncome } from '../feature/income/incomSlice';

export default function IncomePage() {

  const { totalIncome, isIncomeError, isIncomeErrorMessage } = useSelector(
    (state) => state.income
  );
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🟢 TOTAL INCOME (SUM)
  const totalIncomeAmount = totalIncome.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  // 🟢 HIGHEST INCOME SOURCE
  const highestSource =
    totalIncome.length > 0
      ? totalIncome.reduce((prev, curr) =>
          curr.amount > prev.amount ? curr : prev
        ).source
      : "N/A";

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(getIncome());

    if (isIncomeError && isIncomeErrorMessage) {
      toast.error(isIncomeErrorMessage, { position: 'top-center' });
    }
  }, [user, isIncomeError, isIncomeErrorMessage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Your Incomes</h1>
            <p className="text-gray-400">Here's a summary of your earnings</p>
          </div>
          {/* <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300">
            <Plus className="w-5 h-5" />
            Add Income
          </button> */}
        </div>

        {/* 🟢 Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Total Income */}
          <SummaryCard
            title="Total Income"
            value={`$${totalIncomeAmount}`}
            icon={Wallet}
            gradient="bg-gradient-to-br from-emerald-400 to-emerald-600"
          />

          {/* Highest Income Source */}
          <SummaryCard
            title="Highest Income Source"
            value={highestSource}
            icon={TrendingUp}
            gradient="bg-gradient-to-br from-blue-400 to-blue-600"
          />
        </div>

        {/* 🟢 Recent Incomes */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Incomes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {totalIncome.map((item, index) => (
            <IncomeCard key={index} item={item} />
          ))}
        </div>
        

      </div>
    </div>
  );
}
