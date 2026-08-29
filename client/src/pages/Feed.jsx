import { useEffect, useState } from 'react';
import FeedList from '../components/feed/FeedList';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../feature/feed/feedSlice';

import LoadingScreen from '../components/LoadingScreen';
import { toast } from 'react-toastify';

function Feed() {
  const dispatch = useDispatch();

  const { feeds, isFeedError, isFeedLoading, isFeedErrorMessage } = useSelector(
    (state) => state.feed
  );

  const [filters, setFilters] = useState('all');

  // 🔹 Fetch feed only once
  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);



  // 🔹 Loading screen
  if (isFeedLoading) {
    return <LoadingScreen loadingMessage={'Fetching Data...'} />;
  }

  // 🔹 Ensure safe array (avoid map errors)
  const feedArray = feeds?.feed || [];

  const filteredItems =
    filters === 'all'
      ? feedArray
      : feedArray.filter((item) => item.category === filters);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Finance Feed
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Personalized insights and recommendations for your financial journey
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'tip', 'alert', 'sip', 'investment'].map((type) => (
          <button
            key={type}
            onClick={() => setFilters(type)}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              filters === type
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {type === 'all'
              ? 'All'
              : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <FeedList items={filteredItems} />
    </div>
  );
}

export default Feed;
