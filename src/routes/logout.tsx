
import { Link } from 'react-router-dom';

const LogoutComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">You have been logged out</h1>
        <p className="text-gray-600 mb-6">You have successfully logged out of your account. We hope to see you again soon!</p>
        <Link
          to="/"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default LogoutComponent;
