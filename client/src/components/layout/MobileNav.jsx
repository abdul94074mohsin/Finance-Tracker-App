import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  NewspaperIcon,
  TrophyIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

function MobileNav() {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Feed', href: '/feed', icon: NewspaperIcon },
    { name: 'Goals', href: '/goals', icon: TrophyIcon },
    { name: 'Budget', href: '/budget', icon: CurrencyDollarIcon },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <nav className="flex justify-around">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`
              flex flex-col items-center justify-center py-3 px-4 flex-1 transition-colors
              ${
                isActive(item.href)
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }
            `}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default MobileNav;
