import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import NotesPage from './pages/NotesPage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);

  // Check for an existing token on initial app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you would verify the token with the backend
      // and fetch user data. For now, we'll simulate it.
      // This is a placeholder and should be replaced with an API call.
      // For example: fetch('/api/users/profile').then(...)
      console.log('Token found, attempting to auto-login.');
      // setUser({ userid: 'CachedUser' }); // Example of setting user from a verified token
    }
  }, []);

  // Function to handle successful login
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    // Stays on the account page to show the logged-in state
  };

  // Function to handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setCurrentPage('home'); // Redirect to home page after logout
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'notes':
        return (
          <NotesPage
            openLoginPage={() => setCurrentPage('account')}
            isLoggedIn={!!user}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'projects':
        return (
          <ProjectsPage
            openLoginPage={() => setCurrentPage('account')}
            isLoggedIn={!!user}
          />
        );
      case 'account':
        return (
          <LoginPage
            user={user}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
          />
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user} 
      />

      {renderCurrentPage()}
    </div>
  );
};

export default App;