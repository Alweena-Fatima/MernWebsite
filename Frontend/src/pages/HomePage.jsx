import React from 'react';
import { Terminal, Code2 } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-50 text-gray-800 font-mono">
      <div className="max-w-4xl mx-auto px-6 py-24">
        
        {/* Terminal Header */}
        <div className="bg-white rounded-t-lg border border-sky-200 shadow-sm">
          <div className="flex items-center px-4 py-3 border-b border-sky-200">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 text-center text-gray-500 text-sm">
              ~/studyhub/GETOUT.js
            </div>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="bg-sky-50 rounded-b-lg border-l border-r border-b border-sky-200 p-8 shadow-sm">
          <div className="space-y-6">
            
            {/* Terminal Prompt */}
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">$</span>
              <span className="text-gray-700">cd StudyHub</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-blue-600">$</span>
              <span className="text-gray-700">./welcome.sh</span>
            </div>

            {/* Simple Header */}
            <div className="text-blue-600 text-3xl font-bold mb-4">
              ALWEENA KA STUDYHUB
            </div>

            {/* Main Content */}
            <div className="space-y-4">
              <div className="text-sky-600 text-lg">
                Welcome to the student community
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-sky-200 shadow-sm">
                <div className="space-y-4">
                  
                  <div>
                    <div className="text-blue-700 mb-2 text-lg font-bold">📚 Share Notes</div>
                    <div className="ml-4 text-gray-600">
                      <div>Upload study materials and help classmates learn</div>
                    </div>
                  </div>

                  <div className="h-px bg-sky-200"></div>

                  <div>
                    <div className="text-sky-700 mb-2 text-lg font-bold">🤝 Team Up</div>
                    <div className="ml-4 text-gray-600">
                      <div>Find project partners and build cool stuff together</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-center space-x-3 pt-8">
                <Code2 className="h-5 w-5 text-sky-600" />
                <span className="text-gray-500">Made with ❤️ by students</span>
                <Terminal className="h-5 w-5 text-sky-600" />
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;