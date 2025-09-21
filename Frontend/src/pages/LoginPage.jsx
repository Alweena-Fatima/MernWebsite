import React, { useState } from 'react';
import { Terminal, User } from 'lucide-react';

const LoginPage = ({ onLoginSuccess, onLogout, user }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const endpoint = isSignUp
        ? 'http://localhost:5000/api/users/signup'
        : 'http://localhost:5000/api/users/login';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid, password }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch (err) {
        console.warn('No JSON returned', err);
      }

      if (!res.ok) {
        setError(data.message || (isSignUp ? 'Sign up failed' : 'Login failed'));
      } else {
        if (!isSignUp) localStorage.setItem('token', data.token);
        onLoginSuccess(data.user);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-50 px-4 font-mono">
      {user ? (
        // Logged-in view
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md border border-sky-200">
          {/* Terminal Header */}
          <div className="flex items-center px-4 py-3 border-b border-sky-200 bg-sky-50 rounded-t-2xl">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 text-center text-gray-500 text-sm">
              ~/user/dashboard
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              $ whoami
            </h2>
            <div className="text-blue-600 text-lg mb-6">
              {user.userid}
            </div>
            <button
              onClick={onLogout}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl font-medium hover:from-red-600 hover:to-orange-600 transition-all"
            >
              $ logout
            </button>
          </div>
        </div>
      ) : (
        // Login/Signup form view
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md border border-sky-200">
          {/* Terminal Header */}
          <div className="flex items-center px-4 py-3 border-b border-sky-200 bg-sky-50 rounded-t-2xl">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 text-center text-gray-500 text-sm">
              ~/auth/{isSignUp ? 'signup' : 'login'}.sh
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-center space-x-2 mb-6">
              <Terminal className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                $ {isSignUp ? 'create_user' : 'login'}
              </h2>
            </div>

            {error && (
              <div className="text-red-600 mb-4 bg-red-50 p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="$ enter username"
                  value={userid}
                  onChange={(e) => setUserid(e.target.value)}
                  className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-sky-50/50"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="$ enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-sky-50/50"
                  required
                />
              </div>

              {isSignUp && (
                <div>
                  <input
                    type="password"
                    placeholder="$ confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-sky-50/50"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-sky-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-sky-600 transition-all disabled:opacity-50"
              >
                {loading ? '$ processing...' : `$ ${isSignUp ? 'create_account' : 'authenticate'}`}
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isSignUp
                  ? '$ cd login'
                  : '$ cd signup'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;