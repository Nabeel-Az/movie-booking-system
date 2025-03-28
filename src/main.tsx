import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeComponent } from './routes/home';
import { LoginComponent } from './routes/login-page';
import { UserBookingContextProvider } from './hooks/UserBookingContext';
import { AuthProvider } from './hooks/AuthContext';
import { ErrorComponent } from './routes/error-page';
import { MyBookingsComponent } from './routes/my-bookings';
import { NavBar } from './components/NavBar';
import LogoutComponent from './routes/logout';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UserBookingContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/home" element={<ProtectedRoute element={<HomeComponent />} />} />
            <Route path="/my-bookings" element={<ProtectedRoute element={<MyBookingsComponent />} />} />
            <Route path="/logout" element={<ProtectedRoute element={<LogoutComponent />} />} />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </UserBookingContextProvider>
      </AuthProvider>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <React.StrictMode>   
    <App />
  </React.StrictMode>
);
