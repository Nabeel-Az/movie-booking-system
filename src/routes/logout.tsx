import { useAuth } from "@/hooks/AuthContext";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

const LogoutComponent = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          You have been logged out
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We hope to see you again soon!
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/logout")({
  component: LogoutComponent,
});
