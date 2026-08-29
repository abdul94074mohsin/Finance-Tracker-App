function StatsCard({ title, amount, change, changeType, icon: Icon, bgColor, iconColor }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl cursor-pointer shadow-md shadow-blue-100 dark:shadow-none p-6 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1"> {title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{amount}</p>
          {change && (
            <p
              className={`text-sm font-medium ${
                changeType === 'positive'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {changeType === 'positive' ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        <div className={`${bgColor} p-3 rounded-xl`}>
          <Icon className={`h-8 w-8 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
