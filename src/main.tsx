import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth } from "./hooks/AuthContext";
import {
  UserBookingContextProvider,
  useUserBookings,
} from "./hooks/UserBookingContext";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    auth: undefined!,
    userBooking: undefined!,
  },
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;
const InnerApp = () => {
  const auth = useAuth();
  const userBooking = useUserBookings();
  return <RouterProvider router={router} context={{ auth, userBooking }} />;
};
const App = () => {
  return (
    <AuthProvider>
      <UserBookingContextProvider>
        <InnerApp />
      </UserBookingContextProvider>
    </AuthProvider>
  );
};
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
