import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    const { auth } = context; // Access the auth context
    const { userProfile } = auth;

    // Check if the user token is set and has the 'admin' role
    if (!context.auth.userProfile.token || userProfile.role !== 'admin') {
      // Redirect to appropriate page based on user role
      throw redirect({
        to: userProfile.role === 'user' ? "/home" : "/login",
      });
    }
    return; // Allow access if authorized
  },
});
