import React from 'react';
import { Book, Target, Package, GitMerge } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-50 font-mono">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Terminal Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-sky-200 mb-8">
          <div className="flex items-center px-4 py-3 border-b border-sky-200 bg-sky-50 rounded-t-2xl">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 text-center text-gray-500 text-sm">
              ~/studyhub/README.md
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-center space-x-2 mb-4">
              <Book className="h-6 w-6 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">$ cat README.md</h1>
            </div>
            <p className="text-gray-600 pl-8">

              Hey asjfhvhajsfv! I'm <span className="font-semibold text-blue-600">[Alweena ]</span>, a passionate 

              
              student and developer. I created this platform to help students access high-quality notes, 
              generate flashcards, and collaborate on projects.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-sky-200">
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-5 w-5 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-800">## My Mission</h2>
            </div>
            <p className="text-gray-600 pl-7">
              To make learning easier and interactive by providing free resources, tools for note-taking, 
              and collaborative projects for students everywhere.
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Package className="h-5 w-5 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-800">## Features</h2>
            </div>
            <ul className="list-disc list-inside text-gray-600 space-y-2 pl-7">
              <li>Free study notes across multiple subjects</li>
              <li>AI-powered flashcard generation for quick revision</li>
              <li>Project collaboration ideas and community support</li>
              <li>Suggest edits or comment on notes using a rich text editor</li>
            </ul>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <GitMerge className="h-5 w-5 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-800">## Get Involved</h2>
            </div>
            <p className="text-gray-600 pl-7">
              Browse notes, generate flashcards, contribute by suggesting edits, or post your own project ideas. 
              Login is only required for contributing or uploading content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;