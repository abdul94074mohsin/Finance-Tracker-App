import {
  BanknotesIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  SparklesIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import StatsCard from '../components/dashboard/StatsCard';
import QuickActionButton from '../components/dashboard/QuickActionButton';
import MonthlySummaryChart from '../components/dashboard/MonthlySummaryChart';
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import AddIncome from '../components/income/addIncome';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getIncome } from '../feature/income/incomSlice';
import LoadingScreen from '../components/LoadingScreen';
import { getExpense } from '../feature/expense/expenseSlice';
import AddExpense from '../components/expense/AddExpense';
import MiniCAChat from '../components/Mini-CA-AI/MiniCAChat';



function Dashboard() {

  const { user } = useSelector(state => state.auth)
  const { totalExpense, isExpenseError, isExpenseErrorMessage, isExpenseSuccess, isExpenseLoading } = useSelector(state => state.expense)
  const { totalIncome, isIncomeError, isIncomeLoading, isIncomeErrorMessage, isIcomeSuccess } = useSelector(state => state.income)

  const [isIncome, setIsIncome] = useState(false)
  const [isExpense, setIsExpense] = useState(false)
  const [isAiOpen, setIsAiOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()



  const handleQuickAction = (str) => {
    switch (str) {
      case "income":
        setIsIncome(isIncome ? false : true);
        break;
      case "expense":
        setIsExpense(isExpense ? false : true);
        break;
      case "ai":
        setIsAiOpen(isAiOpen ? false : true)

      break;
      default:
       
    }
  };



  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    if (user) {
      dispatch(getIncome())
      dispatch(getExpense())
    }



    if (isIncomeError && isIncomeErrorMessage) {
      toast.error(isIncomeErrorMessage, { position: "top-center" })
    }
    if (isExpenseError && isExpenseErrorMessage) {
      toast.error(isExpenseErrorMessage, { position: "top-center" })
    }
  }, [user, isIncomeError, isIncomeErrorMessage, isExpenseError, isExpenseErrorMessage])

  if (isIncomeLoading) {
    return (
      <LoadingScreen loadingMessage={'Fetching Data...'} />
    )
  }

  const totalIncomeAmount = totalIncome.reduce(
    (sum, item) => sum + (item?.amount || 0),
    0
  );

  const totalExpenseAmount = totalExpense?.reduce((sum, item) => sum + (item.amount || 0), 0)
  let savingMoney = totalIncomeAmount - totalExpenseAmount
 

  if (isIcomeSuccess) {
    toast.success(isIncomeErrorMessage, { position: 'top-left' })
  }


  return (
    <>
      <div className={`${isIncome || isExpense || isAiOpen ? "blur" : "space-y-6"}`}>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your financial overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/income-page">
            <StatsCard
              title="Total Income"
              amount={`₹${totalIncomeAmount}`}
              change="+12.5% from last month"
              changeType="positive"
              icon={BanknotesIcon}
              bgColor="bg-emerald-50 dark:bg-emerald-900/20"
              iconColor="text-emerald-600 dark:text-emerald-400"

            />
          </Link>

          <Link to="/expense-page">
            <StatsCard
              title="Total Expense"
              amount={`₹${totalExpenseAmount}`}
              change="-5.2% from last month"
              changeType="positive"
              icon={ArrowTrendingDownIcon}
              bgColor="bg-rose-50 dark:bg-rose-900/20"
              iconColor="text-rose-600 dark:text-rose-400"
            />
          </Link>
          <StatsCard
            title="Savings"
            amount={`₹${savingMoney}`}
            change="+18.3% from last month"
            changeType="positive"
            icon={CurrencyDollarIcon}
            bgColor="bg-blue-50 dark:bg-blue-900/20"
            iconColor="text-blue-600 dark:text-blue-400"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 ">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionButton
              label="Add Income"
              icon={PlusCircleIcon}
              value="income"
              onClick={() => handleQuickAction("income")}
              bgColor="bg-emerald-100 dark:bg-emerald-900/30"
              textColor="text-emerald-700 dark:text-emerald-400"
            />
            <QuickActionButton
              label="Add Expense"
              icon={MinusCircleIcon}
              value="expense"
              onClick={() => handleQuickAction("expense")}
              bgColor="bg-rose-100 dark:bg-rose-900/30"
              textColor="text-rose-700 dark:text-rose-400"
            />
            
            <QuickActionButton
              label="Ask Mini-CA"
              icon={SparklesIcon}
              value = 'ai'
              onClick={() => handleQuickAction('ai')}
              bgColor="bg-blue-100 dark:bg-blue-900/30"
              textColor="text-blue-700 dark:text-blue-400"
            />
           
              <QuickActionButton
                label="Set Goals"
                icon={FlagIcon}
                onClick={() => handleQuickAction('goals')}
                bgColor="bg-amber-100 dark:bg-amber-900/30"
                textColor="text-amber-700 dark:text-amber-400"
              />
          </div>
        </div>



        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          <MonthlySummaryChart 
    expenses={totalExpense} 
    incomes={totalIncome} 
/>

          <CategoryPieChart totalExpense={totalExpense} />
        </div>

      </div>
      {
        isIncome && <AddIncome handleQuickAction={handleQuickAction} isIncome={isIncome} />
      }

      {
        isExpense && <AddExpense handleQuickAction={handleQuickAction} />
      }
      {
        isAiOpen && <MiniCAChat handleQuickAction = {handleQuickAction} />
      }
    </>
  );
}

export default Dashboard;
