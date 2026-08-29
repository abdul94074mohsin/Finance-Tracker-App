function BudgetCard({ category, allocated, spent, icon: Icon }) {
  const percentage = (spent / allocated) * 100;
  const isOverBudget = percentage > 100;
  const isWarning = percentage > 80 && percentage <= 100;

  const getStatusColor = () => {
    if (isOverBudget) return 'text-rose-600 dark:text-rose-400';
    if (isWarning) return 'text-amber-600 dark:text-amber-400';
    return 'text-emerald-600 dark:text-emerald-400';
  };

  const getProgressColor = () => {
    if (isOverBudget) return 'bg-rose-500';
    if (isWarning) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getBadgeColor = () => {
    if (isOverBudget) return 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400';
    if (isWarning) return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
    return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md shadow-blue-100 dark:shadow-none p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
            <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ₹{spent.toLocaleString()} / ₹{allocated.toLocaleString()}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor()}`}>
          {isOverBudget ? 'Over Budget' : isWarning ? 'Warning' : 'On Track'}
        </span>
      </div>

      <div className="space-y-2">
        <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full rounded-full transition-all ${getProgressColor()}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className={getStatusColor()}>{percentage.toFixed(1)}% Used</span>
          <span className="text-gray-600 dark:text-gray-400">
            ₹{(allocated - spent).toLocaleString()} Remaining
          </span>
        </div>
      </div>
    </div>
  );
}

export default BudgetCard;
