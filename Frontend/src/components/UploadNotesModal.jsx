import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import RichTextEditor from './RichTextEditor';

const UploadNotesModal = ({ onClose, onSubmit }) => {
  const [noteType, setNoteType] = useState('text');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [textContent, setTextContent] = useState('');

  // New: Load draft from localStorage when the modal opens
  useEffect(() => {
    const savedDraft = localStorage.getItem('noteDraft');
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      setTitle(draft.title || '');
      setDescription(draft.description || '');
      setTextContent(draft.content || '');
    }
  }, []);

  // New: Function to save the current text note as a draft
  const handleSaveDraft = () => {
    const draft = { title, description, content: textContent };
    localStorage.setItem('noteDraft', JSON.stringify(draft));
    alert('Draft saved successfully!');
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Please enter a title.');
      return;
    }

    const data = { title, description, type: noteType };
    if (noteType === 'pdf') {
      if (!file) {
        alert('Please select a PDF file.');
        return;
      }
      data.file = file;
    } else {
      data.content = textContent;
    }

    // After successful submission, clear the draft
    onSubmit(data);
    localStorage.removeItem('noteDraft');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-mono">
      <div className="bg-white rounded-2xl w-full max-w-2xl border border-sky-200">
        {/* Modal Header */}
        <div className="flex items-center px-4 py-3 border-b border-sky-200 bg-sky-50 rounded-t-2xl">
          <div className="flex-1 text-center text-gray-500 text-sm">~/upload_notes</div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X className="h-4 w-4" /></button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold">$ upload --new</h2>
          
          <div className="flex gap-2">
            <button onClick={() => setNoteType('text')} className={`px-4 py-2 rounded-lg text-sm ${noteType === 'text' ? 'bg-blue-500 text-white' : 'bg-sky-100'}`}>Text Notes</button>
            <button onClick={() => setNoteType('pdf')} className={`px-4 py-2 rounded-lg text-sm ${noteType === 'pdf' ? 'bg-blue-500 text-white' : 'bg-sky-100'}`}>PDF File</button>
          </div>

          <input type="text" placeholder="$ title='Your Note Title'" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-sky-200 rounded-lg p-2 bg-sky-50/50" />
          <textarea placeholder="$ description='A short description...'" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-sky-200 rounded-lg p-2 bg-sky-50/50" rows="2"></textarea>

          {noteType === 'text' ? (
            <RichTextEditor onUpdate={setTextContent} initialContent={textContent} />
          ) : (
            <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          )}

          {/* Modal Footer */}
          <div className="flex justify-end mt-4 space-x-3 text-sm">
            <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 border border-gray-200">$ cancel</button>
            
            {/* New: Conditionally render the "Save Draft" button */}
            {noteType === 'text' && (
              <button onClick={handleSaveDraft} className="px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 border border-sky-200">$ save --draft</button>
            )}

            <button onClick={handleSubmit} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-lg">$ publish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadNotesModal;