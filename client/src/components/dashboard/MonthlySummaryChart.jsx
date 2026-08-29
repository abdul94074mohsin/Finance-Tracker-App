import React from "react";

function MonthlySummaryChart({ expenses = [], incomes = [] }) {
  // ---- 1. Monthly totals ----
  const monthlyExpense = Array(12).fill(0);
  expenses.forEach((exp) => {
    const m = new Date(exp.date).getMonth();
    monthlyExpense[m] += exp.amount;
  });

  const monthlyIncome = Array(12).fill(0);
  incomes.forEach((inc) => {
    const m = new Date(inc.date).getMonth();
    monthlyIncome[m] += inc.amount;
  });

  // ---- 2. Auto scaling ----
  const maxVal = Math.max(...monthlyExpense, ...monthlyIncome, 1);
  const scaleFactor = 300 / maxVal; // 300px max height

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const monthlyData = months.map((m, i) => ({
    month: m,
    incomeHeight: monthlyIncome[i] * scaleFactor,
    expenseHeight: monthlyExpense[i] * scaleFactor,
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md shadow-blue-100 dark:shadow-none p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Monthly Summary
      </h3>

      <div className="flex items-end justify-between gap-4 h-64">
        {monthlyData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            
            <div className="w-full flex  items-end gap-1">
              
              {/* Income Bar */}
              <div
                className="w-2 bg-emerald-500 rounded-t hover:bg-emerald-600"
                style={{ height: `${data.incomeHeight-100}px` }}
                ></div>

              {/* Expense Bar */}
              <div
                className="w-2 bg-rose-500 rounded-t hover:bg-rose-600"
                style={{ height: `${data.expenseHeight}px` }}
               
              ></div>
            </div>

            <span className="text-xs text-gray-600 dark:text-gray-400">
              {data.month}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full" />
          <span>Income</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-rose-500 rounded-full" />
          <span>Expense</span>
        </div>
      </div>
    </div>
  );
}

export default MonthlySummaryChart;
