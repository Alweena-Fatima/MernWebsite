import React, { useState } from 'react';
import { X } from 'lucide-react';

const RichTextEditorModal = ({ note, onClose, onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    // Pass the textarea content to the parent's submit function
    onSubmit(content);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-mono">
      <div className="bg-white rounded-xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-hidden border border-sky-200">
        {/* Modal terminal header */}
        <div className="flex items-center px-4 py-3 border-b border-sky-200 bg-sky-50">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 text-center text-gray-500 text-sm">
            ~/pull_request/{note.title.replace(/\s+/g, '_').toLowerCase()}
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">$ vim pull_request.md</h3>
          <textarea
            className="w-full h-64 p-4 border border-sky-200 rounded-lg bg-sky-50/50 font-mono text-sm focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none"
            placeholder="# Pull Request&#10;&#10;## Changes:&#10;- &#10;&#10;## Reason:&#10;- "
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end mt-4 space-x-3 text-sm">
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
              onClick={onClose}
            >
              $ cancel
            </button>
            <button
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-lg hover:from-blue-600 hover:to-sky-600"
              onClick={handleSubmit}
            >
              $ submit --pr
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditorModal;