import { useState, useEffect } from 'react';
import {
  ShoppingBagIcon,
  HomeIcon,
  TruckIcon,
  FilmIcon,
  HeartIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import BudgetCard from '../components/budget/BudgetCard';
import { useDispatch, useSelector } from 'react-redux';
import { getBudget } from '../feature/budget/budgetSlice';

function Budget() {
  const dispatch = useDispatch();
  const { budget, isBudgetLoading, isBudgetError, budgetMessage } =
    useSelector((state) => state.budget);

  // RUN API only once
  useEffect(() => {
    dispatch(getBudget());
  }, [dispatch]);

  // Correct path because API response is nested  
  const categoryData = budget?.budget?.categories || [];

  // Safe reduce
  const totalAllocated = categoryData.reduce(
    (sum, item) => sum + (item.limit || 0),
    0
  );

  const totalSpent = categoryData.reduce(
    (sum, item) => sum + (item.spent || 0),
    0
  );

  console.log("Allocated:", totalAllocated);
  console.log("Spent:", totalSpent);

  const overallPercentage =
    totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;

  if (isBudgetLoading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (isBudgetError) {
    return <p className="text-center text-red-600">{budgetMessage}</p>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Budget Management</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your spending across categories
        </p>
      </div>

      {/* OVERALL SUMMARY */}
      <div className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <p className="text-gray-600 dark:text-gray-400 mb-1">Total Allocated</p>
            <p className="text-2xl font-bold text-blue-600">
              ₹{totalAllocated.toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <p className="text-gray-600 dark:text-gray-400 mb-1">Total Spent</p>
            <p className="text-2xl font-bold text-rose-600">
              ₹{totalSpent.toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <p className="text-gray-600 dark:text-gray-400 mb-1">Remaining</p>
            <p className="text-2xl font-bold text-emerald-600">
              ₹{(totalAllocated - totalSpent).toLocaleString()}
            </p>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-6">
          <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full rounded-full ${
                overallPercentage > 100
                  ? 'bg-rose-500'
                  : overallPercentage > 80
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(overallPercentage, 100)}%` }}
            />
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {overallPercentage.toFixed(1)}% of budget used
          </p>
        </div>
      </div>

      {/* CATEGORY ITEMS */}
      <div>
        <h2 className="text-xl font-semibold dark:text-white mb-4">
          Category Budgets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoryData.map((c) => (
            <BudgetCard
              key={c._id}
              category={c.name}
              allocated={c.limit}
              spent={c.spent}
              icon={ShoppingBagIcon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Budget;
