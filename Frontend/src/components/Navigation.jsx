import React from 'react';
import { Terminal } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage, user }) => {
  const navItems = [
    { name: 'Home', key: 'home' },
    { name: 'Notes', key: 'notes' },
    { name: 'Projects', key: 'projects' },
    { name: 'Account', key: 'account' },
    { name: 'About', key: 'about' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b-2 border-sky-200 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <Terminal className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-800">StudyHub</span>
          </div>

          <div className="flex space-x-2">
            {navItems.map((item) => {
              // Check if the current item is 'Account' and if the user is logged in
              const isAccount = item.key === 'account';
              const buttonText = isAccount && user ? `Hi, ${user.userid}` : item.name;

              return (
                <button
                  key={item.key}
                  onClick={() => setCurrentPage(item.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.key
                      ? 'bg-sky-100 text-blue-700 border border-sky-200'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-sky-50'
                  }`}
                >
                  {buttonText}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;