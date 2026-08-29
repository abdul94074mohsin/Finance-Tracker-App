import {
  LightBulbIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

function FeedCard({ item }) {
  const getCategoryStyles = () => {
    switch (item.category) {
      case 'tip':
        return {
          badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
          icon: LightBulbIcon,
          iconBg: 'bg-blue-50 dark:bg-blue-900/20',
          iconColor: 'text-blue-600 dark:text-blue-400',
        };
      case 'alert':
        return {
          badge: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400',
          icon: ExclamationTriangleIcon,
          iconBg: 'bg-rose-50 dark:bg-rose-900/20',
          iconColor: 'text-rose-600 dark:text-rose-400',
        };
      case 'sip':
        return {
          badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
          icon: ChartBarIcon,
          iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
          iconColor: 'text-emerald-600 dark:text-emerald-400',
        };
      case 'investment':
        return {
          badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
          icon: SparklesIcon,
          iconBg: 'bg-amber-50 dark:bg-amber-900/20',
          iconColor: 'text-amber-600 dark:text-amber-400',
        };
      default:
        return {
          badge: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
          icon: LightBulbIcon,
          iconBg: 'bg-gray-50 dark:bg-gray-800',
          iconColor: 'text-gray-600 dark:text-gray-400',
        };
    }
  };

  const styles = getCategoryStyles();
  const Icon = styles.icon;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md shadow-blue-100 dark:shadow-none p-6 hover:shadow-lg transition-all">
      <div className="flex items-start gap-4">
        <div className={`${styles.iconBg} p-3 rounded-xl`}>
          <Icon className={`h-6 w-6 ${styles.iconColor}`} />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles.badge}`}>
              {item.category.toUpperCase()}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-500">{item.time}</span>
            {item.action && (
              <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                {item.action}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedCard;
