import { Link } from '@tanstack/react-router';

const NavLinks = ({ role }: { role: string }) => {
  if (role === 'user') {
    return (
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
    );
  }

  if (role === 'admin') {
    return (
      <>
        <li>
          <Link to="/admin" className="text-white hover:text-gray-200 hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/admin/movies" className="text-white hover:text-gray-200 hover:underline">
            Movie Creation
          </Link>
        </li>
      </>
    );
  }

  return null;
};

export default NavLinks;