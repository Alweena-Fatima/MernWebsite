import React, { useState } from 'react';
import { sampleProjects } from '../data/sampleData';
import { Plus, X, Code, Users } from 'lucide-react';

const ProjectsPage = ({ openLoginPage, isLoggedIn }) => {
  const [collabProject, setCollabProject] = useState(null);
  const [collabForm, setCollabForm] = useState({ name: '', email: '', message: '', techStack: '' });

  const difficultyColors = {
    'Beginner': 'bg-green-100 text-green-700 border-green-200',
    'Intermediate': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Advanced': 'bg-red-100 text-red-700 border-red-200'
  };

  const openCollabModal = (project) => {
    if (!isLoggedIn) {
      return openLoginPage();
    }
    setCollabProject(project);
  };

  const closeCollabModal = () => {
    setCollabProject(null);
    setCollabForm({ name: '', email: '', message: '', techStack: '' });
  };

  const handleCollabSubmit = () => {
    alert(`$ collaboration_request sent to ${collabProject.author}!\n\n${JSON.stringify(collabForm, null, 2)}`);
    closeCollabModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-50 font-mono">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Terminal Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-sky-200 mb-8">
          <div className="flex items-center px-4 py-3 border-b border-sky-200 bg-sky-50 rounded-t-2xl">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 text-center text-gray-500 text-sm">
              ~/studyhub/projects
            </div>
          </div>
          
          <div className="p-6 flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Code className="h-6 w-6 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-800">$ ls projects/</h1>
              </div>
              <p className="text-gray-600">Discover exciting projects and find collaborators</p>
            </div>
            
            <button
              onClick={() => !isLoggedIn ? openLoginPage() : alert('$ create_project --interactive')}
              className="bg-gradient-to-r from-blue-500 to-sky-500 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-sky-600 transition-all flex items-center space-x-2 shrink-0"
            >
              <Plus className="h-5 w-5" />
              <span>$ new --project</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-sky-100">
              
              {/* Mini terminal header */}
              <div className="flex items-center px-3 py-2 border border-sky-200 bg-sky-50 rounded-lg mb-4">
                <div className="flex space-x-1 mr-3">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${difficultyColors[project.difficulty]}`}>
                  {project.difficulty}
                </span>
                <span className="ml-auto text-xs text-gray-500">by {project.author}</span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-3">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-sky-100 text-sky-700 rounded-lg text-xs border border-sky-200">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <button className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors border border-blue-200">
                  $ cat README.md
                </button>
                <button
                  className="bg-sky-50 text-sky-600 px-3 py-2 rounded-lg font-medium hover:bg-sky-100 transition-colors border border-sky-200"
                  onClick={() => openCollabModal(project)}
                >
                  $ git clone
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Collab Modal */}
        {collabProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-11/12 md:w-1/2 lg:w-1/3 border border-sky-200">
              
              {/* Modal terminal header */}
              <div className="flex items-center px-4 py-3 border-b border-sky-200 bg-sky-50 rounded-t-2xl">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 text-center text-gray-500 text-sm">
                  ~/collaboration_request.json
                </div>
                <button onClick={closeCollabModal} className="text-gray-500 hover:text-gray-700">
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h3 className="text-xl font-bold">$ join {collabProject.title.replace(/\s+/g, '_').toLowerCase()}</h3>
                </div>
                
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="$ echo 'your_name'"
                    className="w-full border border-sky-200 rounded-lg px-3 py-2 bg-sky-50/50 focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none"
                    value={collabForm.name}
                    onChange={(e) => setCollabForm({...collabForm, name: e.target.value})}
                  />
                  <input
                    type="email"
                    placeholder="$ cat contact.email"
                    className="w-full border border-sky-200 rounded-lg px-3 py-2 bg-sky-50/50 focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none"
                    value={collabForm.email}
                    onChange={(e) => setCollabForm({...collabForm, email: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="$ ls skills/"
                    className="w-full border border-sky-200 rounded-lg px-3 py-2 bg-sky-50/50 focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none"
                    value={collabForm.techStack}
                    onChange={(e) => setCollabForm({...collabForm, techStack: e.target.value})}
                  />
                  <textarea
                    placeholder="$ vim proposal.md"
                    className="w-full border border-sky-200 rounded-lg px-3 py-2 resize-none bg-sky-50/50 focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none"
                    rows={4}
                    value={collabForm.message}
                    onChange={(e) => setCollabForm({...collabForm, message: e.target.value})}
                  />
                </div>

                <div className="flex justify-end mt-4 space-x-3 text-sm">
                  <button
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
                    onClick={closeCollabModal}
                  >
                    $ exit 0
                  </button>
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-lg hover:from-blue-600 hover:to-sky-600 transition-all"
                    onClick={handleCollabSubmit}
                  >
                    $ submit --request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProjectsPage;