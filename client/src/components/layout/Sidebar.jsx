import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  NewspaperIcon,
  TrophyIcon,
  CurrencyDollarIcon,
  ArrowLeftEndOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { LogOut } from '../../feature/auth/authSlice';

function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Feed', href: '/feed', icon: NewspaperIcon },
    { name: 'Goals', href: '/goals', icon: TrophyIcon },
    { name: 'Budget', href: '/budget', icon: CurrencyDollarIcon },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(LogOut())
    navigate("/login");
  };

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 pb-4">
        
        <div className="flex h-16 shrink-0 items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Finance AI
          </h1>
        </div>

        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-7">
            
            <li>
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`
                        group flex gap-x-3 rounded-xl p-3 text-sm font-semibold leading-6 transition-all
                        ${
                          isActive(item.href)
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }
                      `}
                    >
                      <item.icon className="h-6 w-6 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* 🔥 Logout Button */}
            <li className="mt-auto">
              <button
                onClick={handleLogout}
                className="group flex w-full gap-x-3 rounded-xl p-3 text-sm font-semibold leading-6 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all hover:cursor-pointer"
              >
                <ArrowLeftEndOnRectangleIcon className="h-6 w-6 shrink-0" />
                Logout
              </button>
            </li>

          </ul>
        </nav>

      </div>
    </div>
  );
}

export default Sidebar;
