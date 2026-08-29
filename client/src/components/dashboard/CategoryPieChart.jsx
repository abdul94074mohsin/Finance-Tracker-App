import { useMemo } from "react";

const COLORS = {
  food: "#F59E0B",
  shopping: "#EC4899",
  travel: "#3B82F6",
  medicine: "#EF4444",
  bills: "#EAB308",
  other: "#A855F7",
};

function CategoryPieChart({ totalExpense }) {
  if (!totalExpense || totalExpense.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Category Breakdown
        </h3>
        <p className="text-gray-500">No totalExpense found.</p>
      </div>
    );
  }

  // 🔥 GROUP EXPENSE BY CATEGORY
  const data = useMemo(() => {
    const grouped = {};

    totalExpense.forEach((exp) => {
      if (!grouped[exp.category]) grouped[exp.category] = 0;
      grouped[exp.category] += exp.amount;
    });

    return Object.keys(grouped).map((cat) => ({
      name: cat,
      amount: grouped[cat],
      color: COLORS[cat] || COLORS.other,
    }));
  }, [totalExpense]);

  // 🔥 TOTAL EXPENSE
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  // 🔥 CALCULATE PIE SLICES
  let dashOffset = 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Category Breakdown
      </h3>

      {/* PIE CHART */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {data.map((slice, index) => {
              const percentage = (slice.amount / total) * 100;
              const circumference = 251.2;
              const dashArray = (percentage / 100) * circumference;

              const circle = (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={slice.color}
                  strokeWidth="20"
                  strokeDasharray={`${dashArray} ${circumference}`}
                  strokeDashoffset={-dashOffset}
                />
              );

              dashOffset += dashArray;
              return circle;
            })}
          </svg>
        </div>
      </div>

      {/* LEGENDS */}
      <div className="space-y-3">
        {data.map((slice) => {
          const percentage = ((slice.amount / total) * 100).toFixed(1);

          return (
            <div key={slice.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: slice.color }}
                ></div>
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {slice.name}
                </span>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  ₹{slice.amount}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {percentage}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryPieChart;
