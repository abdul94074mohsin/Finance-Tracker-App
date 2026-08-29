import { useState } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="lg:pl-64">
          <main className="min-h-screen pb-20 lg:pb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>

        <MobileNav />
      </div>
    </div>
  );
}

export default Layout;
