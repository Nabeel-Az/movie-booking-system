import { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  user: { username: string } | null;
  login: (username: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string } | null>(null);

  const login = (username: string) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
    navigate('/logout');
  };

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    user,
    login,
    logout,
  }), [user]); // Only re-run when `user` changes

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};