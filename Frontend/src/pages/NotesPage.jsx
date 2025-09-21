import React, { useState } from 'react';
import { subjects, sampleNotes } from '../data/sampleData';
import { Upload, Download, Brain, MessageCircle, FileText } from 'lucide-react';
import UploadNotesModal from '../components/UploadNotesModal'; // Correctly import the modal
import RichTextEditorModal from '../components/RichTextEditorModal'; // Assuming this exists for PRs

const NotesPage = ({ openLoginPage, isLoggedIn }) => {
  const [editingNote, setEditingNote] = useState(null);
  const [flashcards, setFlashcards] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const handlePullRequest = (note) => {
    if (!isLoggedIn) return openLoginPage();
    if (note.type === 'text') {
      setEditingNote(note);
    } else if (note.type === 'pdf') {
      alert(`$ pull_request submitted to ${note.title} owner`);
    }
  };

  const generateFlashcards = async (note) => {
    if (!isLoggedIn) return openLoginPage();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/notes/flashcards/${note.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setFlashcards(prev => ({ ...prev, [note.id]: data.flashcards }));
      } else {
        alert(data.message || '$ flashcard_generation failed');
      }
    } catch (err) {
      console.error(err);
      alert('$ error: flashcard generation failed');
    }
  };

  const handleUploadSubmit = (noteData) => {
    console.log("Note data to be sent to backend:", noteData);
    alert(`$ note '${noteData.title}' prepared for upload.`);
    setIsUploading(false);
  };

  const handleDownload = (note) => {
    window.open(`http://localhost:5000/api/notes/download/${note.id}`, '_blank');
  };

  const handleSubmitPullRequest = async (content) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/notes/pullrequest/${editingNote.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('$ pull_request submitted successfully!');
      } else {
        alert(data.message || '$ pull_request failed');
      }
    } catch (err) {
      console.error(err);
      alert('$ error: pull request submission failed');
    }
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-50 font-mono">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Terminal Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-sky-200 mb-8">
          <div className="flex items-center px-4 py-3 border-b border-sky-200 bg-sky-50 rounded-t-2xl">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 text-center text-gray-500 text-sm">
              ~/studyhub/notes
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">$ ls notes/</h1>
            </div>
            <p className="text-gray-600 mb-4">
              Browse and download study materials from fellow students
            </p>
            <button
              onClick={() => !isLoggedIn ? openLoginPage() : setIsUploading(true)}
              className="w-full bg-gradient-to-r from-blue-500 to-sky-500 text-white px-4 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-sky-600 transition-all flex items-center justify-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>$ upload --notes</span>
            </button>
          </div>
        </div>

        {/* Notes grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleNotes.map(note => {
            const subject = subjects.find(s => s.id === note.subject);
            return (
              <div key={note.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-sky-100">
                
                <div className="flex items-center px-3 py-2 border border-sky-200 bg-sky-50 rounded-lg mb-4">
                  <div className="flex space-x-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${subject?.color || 'bg-gray-100 text-gray-700'}`}>
                    {subject?.name || 'General'}
                  </span>
                  <span className="ml-auto text-xs text-gray-500">{note.downloadCount} downloads</span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2">{note.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{note.description}</p>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button onClick={() => handleDownload(note)} className="bg-green-50 text-green-600 px-2 py-2 rounded-lg font-medium hover:bg-green-100 transition-colors flex items-center justify-center space-x-1 border border-green-200">
                    <Download className="h-3 w-3" />
                    <span>get</span>
                  </button>
                  <button onClick={() => generateFlashcards(note)} className="bg-purple-50 text-purple-600 px-2 py-2 rounded-lg font-medium hover:bg-purple-100 transition-colors flex items-center justify-center space-x-1 border border-purple-200">
                    <Brain className="h-3 w-3" />
                    <span>gen</span>
                  </button>
                  <button onClick={() => handlePullRequest(note)} className="bg-blue-50 text-blue-600 px-2 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1 border border-blue-200">
                    <MessageCircle className="h-3 w-3" />
                    <span>pr</span>
                  </button>
                </div>

                {flashcards[note.id] && (
                  <div className="mt-4 p-3 bg-sky-50 rounded-lg border border-sky-200">
                    <h4 className="font-semibold mb-2 text-blue-700">$ flashcards.json:</h4>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      {flashcards[note.id].map((fc, i) => <li key={i}>{fc}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Conditionally render the modals */}
      {isUploading && (
        <UploadNotesModal 
          onClose={() => setIsUploading(false)} 
          onSubmit={handleUploadSubmit} 
        />
      )}
      
      {editingNote && (
        <RichTextEditorModal
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onSubmit={handleSubmitPullRequest}
        />
      )}
    </div>
  );
};

export default NotesPage;