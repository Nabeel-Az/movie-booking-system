import { useRouter } from "@tanstack/react-router";
import { useAuth } from "../hooks/AuthContext";

import NavLinks from "./NavLink";
import NavUserInfo from "./NavUserInfo";

const NavBar = () => {
  const { userProfile, logout } = useAuth();
  const router = useRouter();

  const isUserProfileValid = userProfile?.userId?.trim() !== "";

  const onLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      router.invalidate().finally(() => {
        router.navigate({ to: "/logout" });
      });
    }
  };

  return (
    <nav className="bg-blue-600 p-4 h-[56px]">
      <div className="flex justify-between items-center">
        <ul className="flex space-x-4">
          {isUserProfileValid && <NavLinks role={userProfile.role} />}
        </ul>
        {isUserProfileValid && (
          <div className="flex items-center space-x-4">
            <NavUserInfo name={userProfile.name} role={userProfile.role} />
            <button
              onClick={onLogout}
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

export default NavBar;
