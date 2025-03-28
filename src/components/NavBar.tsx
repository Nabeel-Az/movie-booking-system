import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

export const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 h-[56px]">
      <div className="flex justify-between items-center">
        <ul className="flex space-x-4">
          {user && (
            <>
              <li>
                <Link to="/home" className="text-white hover:text-gray-200 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-white hover:text-gray-200 hover:underline">
                  My Bookings
                </Link>
              </li>
            </>
          )}
        </ul>
        {user && (
          <div className="flex items-center space-x-4">
            <div className="text-white">
              Welcome, {user.username}
            </div>
            <button
              onClick={logout}
              className="text-white hover:text-red-700 hover:underline"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
