import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

export const LoginComponent = () => {
  const { user, login } = useAuth();

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-xl">
        {user ? (
          <div className="text-center">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Welcome, {user.username}!</h2>
            <p className="text-lg text-gray-600 mb-8">You are successfully logged in.</p>
            <div className="flex justify-center gap-6">
              <Link
                to="/home"
                className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Go to Home Page
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Movie Booking Management System!</h2>
            <p className="text-lg text-gray-600 mb-8">Please log in to continue.</p>
            <button
              onClick={() => login('Blake Timothy')}
              className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
